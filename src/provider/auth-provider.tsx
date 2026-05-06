import { AuthContext } from "@/hooks/use-auth-context";
import { PropsWithChildren, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { User } from "@supabase/supabase-js";

export default function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      try {
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Auth init error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

          if (error) {
            // Fallback to metadata
            setProfile({
              name: user.user_metadata?.full_name || user.user_metadata?.name || "Wafi User",
              email: user.email,
            });
          } else {
            setProfile(data);
          }
        } catch (e) {
          setProfile({
            name: user.user_metadata?.full_name || user.user_metadata?.name || "Wafi User",
            email: user.email,
          });
        }
      } else {
        setProfile(null);
      }
    };

    fetchProfile();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        claims: user ? (user as any) : null,
        user,
        isLoading,
        profile,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
