"use server";

import { redirect } from "next/navigation";
import { createClient as createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { hasPublicSupabaseEnv, hasServiceRoleEnv } from "@/lib/db/env";

function errorRedirect(path: string, message: string): never {
  const params = new URLSearchParams({ error: message });
  redirect(`${path}?${params.toString()}` as never);
}

export async function loginAction(formData: FormData) {
  if (!hasPublicSupabaseEnv()) {
    errorRedirect("/login", "Add Supabase environment variables to enable sign-in.");
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();
  const nextPath = String(formData.get("next") ?? "/dashboard");

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    errorRedirect("/login", error.message);
  }

  redirect(nextPath.startsWith("/") ? (nextPath as never) : "/dashboard");
}

export async function signupAction(formData: FormData) {
  if (!hasPublicSupabaseEnv() || !hasServiceRoleEnv()) {
    errorRedirect("/signup", "Add all Supabase environment variables before creating accounts.");
  }

  const organizationName = String(formData.get("organizationName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();

  if (!organizationName || !email || !password) {
    errorRedirect("/signup", "All fields are required.");
  }

  const admin = createAdminClient();
  const slug = organizationName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48) || "workspace";

  const { data: userData, error: createUserError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      organization_name: organizationName
    }
  });

  const user = userData.user;

  if (createUserError || !user) {
    errorRedirect("/signup", createUserError?.message ?? "Unable to create the user.");
  }

  const { data: organizationData, error: organizationError } = await admin
    .from("organizations")
    .insert({ name: organizationName, slug })
    .select("id")
    .single();

  if (organizationError || !organizationData) {
    await admin.auth.admin.deleteUser(user.id);
    errorRedirect("/signup", organizationError?.message ?? "Unable to create the organization.");
  }

  const organization = organizationData;

  const { data: roleData, error: roleError } = await admin
    .from("roles")
    .insert({ organization_id: organization.id, name: "Owner", description: "Full access" })
    .select("id")
    .single();

  if (roleError || !roleData) {
    await admin.from("organizations").delete().eq("id", organization.id);
    await admin.auth.admin.deleteUser(user.id);
    errorRedirect("/signup", roleError?.message ?? "Unable to create the owner role.");
  }

  const role = roleData;

  const { error: profileError } = await admin.from("profiles").insert({
    id: user.id,
    organization_id: organization.id,
    role_id: role.id,
    email,
    full_name: email.split("@")[0]
  });

  if (profileError) {
    await admin.from("roles").delete().eq("id", role.id);
    await admin.from("organizations").delete().eq("id", organization.id);
    await admin.auth.admin.deleteUser(user.id);
    errorRedirect("/signup", profileError.message);
  }

  const starterCategoriesResult = await admin.from("categories").insert([
    { organization_id: organization.id, name: "Drinkware", slug: "drinkware" },
    { organization_id: organization.id, name: "Bags", slug: "bags" },
    { organization_id: organization.id, name: "Electronics", slug: "electronics" },
    { organization_id: organization.id, name: "Bundles", slug: "bundles" }
  ]);

  if (starterCategoriesResult.error) {
    await admin.from("profiles").delete().eq("id", user.id);
    await admin.from("roles").delete().eq("id", role.id);
    await admin.from("organizations").delete().eq("id", organization.id);
    await admin.auth.admin.deleteUser(user.id);
    errorRedirect("/signup", starterCategoriesResult.error.message);
  }

  const starterWarehouseResult = await admin.from("warehouses").insert({
    organization_id: organization.id,
    name: "Main Warehouse",
    code: "MAIN",
    city: null,
    state: null,
    country: "US",
    is_default: true
  });

  if (starterWarehouseResult.error) {
    await admin.from("profiles").delete().eq("id", user.id);
    await admin.from("roles").delete().eq("id", role.id);
    await admin.from("organizations").delete().eq("id", organization.id);
    await admin.auth.admin.deleteUser(user.id);
    errorRedirect("/signup", starterWarehouseResult.error.message);
  }

  const starterSupplierResult = await admin.from("suppliers").insert({
    organization_id: organization.id,
    name: `${organizationName} Starter Supplier`,
    email: null,
    lead_time_days: 7,
    minimum_order_value: 0,
    currency: "USD",
    status: "active"
  });

  if (starterSupplierResult.error) {
    await admin.from("profiles").delete().eq("id", user.id);
    await admin.from("roles").delete().eq("id", role.id);
    await admin.from("organizations").delete().eq("id", organization.id);
    await admin.auth.admin.deleteUser(user.id);
    errorRedirect("/signup", starterSupplierResult.error.message);
  }

  const starterCustomerResult = await admin.from("customers").insert({
    organization_id: organization.id,
    name: `${organizationName} First Customer`,
    email: null,
    company_name: organizationName
  });

  if (starterCustomerResult.error) {
    await admin.from("profiles").delete().eq("id", user.id);
    await admin.from("roles").delete().eq("id", role.id);
    await admin.from("organizations").delete().eq("id", organization.id);
    await admin.auth.admin.deleteUser(user.id);
    errorRedirect("/signup", starterCustomerResult.error.message);
  }

  const supabase = await createServerSupabaseClient();
  const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

  if (signInError) {
    errorRedirect("/login", signInError.message);
  }

  redirect("/dashboard");
}

export async function signOutAction() {
  if (!hasPublicSupabaseEnv()) {
    redirect("/");
  }

  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/login");
}
