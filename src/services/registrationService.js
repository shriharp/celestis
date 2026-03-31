import { supabase } from "../lib/supabase";

// Check if user is registered
export const isUserRegistered = async (userId, workshopId) => {
  const { data, error } = await supabase
    .from("registrations")
    .select("id")
    .eq("user_id", userId)
    .eq("workshop_id", workshopId)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error(error);
  }

  return !!data;
};

// Register user
export const registerForEvent = async (userId, workshopId) => {
  const { error } = await supabase.from("registrations").insert([
    {
      user_id: userId,
      workshop_id: workshopId,
    },
  ]);

  if (error) throw error;
  return true;
};

const getRegistrationCount = async (eventId) => {
  const { count, error } = await supabase
    .from("registrations")
    .select("*", { count: "exact", head: true })
    .eq("workshop_id", eventId);

  if (error) {
    console.error("Error getting count:", error);
    return 0;
  }

  return count || 0;
};

// Unregister user
export const unregisterFromEvent = async (userId, workshopId) => {
  const { error } = await supabase
    .from("registrations")
    .delete()
    .eq("user_id", userId)
    .eq("workshop_id", workshopId);

  if (error) throw error;
  return true;
};