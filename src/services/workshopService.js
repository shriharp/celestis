import { supabase } from "../lib/supabase";

/* =========================
   ✅ JOIN WORKSHOP
========================= */
export const joinWorkshop = async (userId, workshopId) => {
  try {
    const { error } = await supabase.from("registrations").insert([
      {
        user_id: userId,
        workshop_id: workshopId,
      },
    ]);

    if (error) {
      // Handle duplicate join gracefully
      if (error.code === "23505") {
        return { success: false, error: "Already registered" };
      }

      return { success: false, error: error.message };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Something went wrong" };
  }
};

/* =========================
   ❌ LEAVE WORKSHOP
========================= */
export const leaveWorkshop = async (userId, workshopId) => {
  try {
    const { error } = await supabase
      .from("registrations")
      .delete()
      .eq("user_id", userId)
      .eq("workshop_id", workshopId);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Something went wrong" };
  }
};

/* =========================
   🔍 CHECK IF JOINED
========================= */
export const isUserRegistered = async (userId, workshopId) => {
  try {
    const { data, error } = await supabase
      .from("registrations")
      .select("id")
      .eq("user_id", userId)
      .eq("workshop_id", workshopId)
      .maybeSingle();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, joined: !!data };
  } catch {
    return { success: false, joined: false };
  }
};

/* =========================
   🔁 TOGGLE (BEST UX)
========================= */
export const toggleWorkshop = async (userId, workshopId) => {
  const check = await isUserRegistered(userId, workshopId);

  if (!check.success) return check;

  if (check.joined) {
    return await leaveWorkshop(userId, workshopId);
  } else {
    return await joinWorkshop(userId, workshopId);
  }
};
