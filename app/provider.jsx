"use client";

import { UserDetailContext } from "@/context/UserDetailContext";
import { getSupabaseClient } from "@/services/supabaseClient";
import React, { useEffect, useState, useContext } from "react";

function Provider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    CreateNewUser();
  }, []);

  const CreateNewUser = async () => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      console.warn("❌ Supabase client not initialized.");
      return;
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.warn("No Supabase user found or auth error:", authError);
      return;
    }

    const { data: Users, error } = await supabase
      .from("Users")
      .select("*")
      .eq("email", user.email);

    if (error) {
      console.error("Supabase fetch error:", error);
      return;
    }

    if (!Users || Users.length === 0) {
      const { data, error: insertError } = await supabase
        .from("Users")
        .insert([
          {
            name: user.user_metadata?.name,
            email: user.email,
            picture: user.user_metadata?.picture,
          },
        ])
        .select();

      if (insertError) {
        console.error("User insert error:", insertError);
        return;
      }

      setUser(data[0]);
    } else {
      setUser(Users[0]);
    }
  };

  return (
    <UserDetailContext.Provider value={{ user, setUser }}>
      <div>{children}</div>
    </UserDetailContext.Provider>
  );
}

export default Provider;

export const useUser = () => {
  const context = useContext(UserDetailContext);
  return context;
};
