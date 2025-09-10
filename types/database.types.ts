export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      audit_log: {
        Row: {
          action_type: string | null
          actor_email: string | null
          created_at: string
          id: number
          message: string | null
          metadata: Json | null
          object_id: string | null
          object_table: string | null
          row_after: Json | null
          row_before: Json | null
        }
        Insert: {
          action_type?: string | null
          actor_email?: string | null
          created_at?: string
          id?: number
          message?: string | null
          metadata?: Json | null
          object_id?: string | null
          object_table?: string | null
          row_after?: Json | null
          row_before?: Json | null
        }
        Update: {
          action_type?: string | null
          actor_email?: string | null
          created_at?: string
          id?: number
          message?: string | null
          metadata?: Json | null
          object_id?: string | null
          object_table?: string | null
          row_after?: Json | null
          row_before?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_log_actor_email_fkey"
            columns: ["actor_email"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["email"]
          },
        ]
      }
      events: {
        Row: {
          category: string | null
          created_at: string
          datetime: string | null
          department: string | null
          description: string | null
          id: number
          image: string | null
          location: string | null
          name: string | null
          one_liner: string | null
          register: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          datetime?: string | null
          department?: string | null
          description?: string | null
          id?: number
          image?: string | null
          location?: string | null
          name?: string | null
          one_liner?: string | null
          register?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          datetime?: string | null
          department?: string | null
          description?: string | null
          id?: number
          image?: string | null
          location?: string | null
          name?: string | null
          one_liner?: string | null
          register?: string | null
        }
        Relationships: []
      }
      people: {
        Row: {
          can_login: boolean | null
          created_at: string
          display_order: number | null
          email: string
          full_name: string | null
          id: number
          instagram: string | null
          is_active: boolean | null
          linkedin: string | null
          profile_image: string | null
          role_id: number | null
          team_id: number | null
          twitter: string | null
        }
        Insert: {
          can_login?: boolean | null
          created_at?: string
          display_order?: number | null
          email: string
          full_name?: string | null
          id?: number
          instagram?: string | null
          is_active?: boolean | null
          linkedin?: string | null
          profile_image?: string | null
          role_id?: number | null
          team_id?: number | null
          twitter?: string | null
        }
        Update: {
          can_login?: boolean | null
          created_at?: string
          display_order?: number | null
          email?: string
          full_name?: string | null
          id?: number
          instagram?: string | null
          is_active?: boolean | null
          linkedin?: string | null
          profile_image?: string | null
          role_id?: number | null
          team_id?: number | null
          twitter?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "people_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "people_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      people_permissions: {
        Row: {
          created_at: string
          expires_at: string | null
          granted_at: string | null
          granted_by: number | null
          id: number
          notes: string | null
          permission_id: string | null
          person_id: number | null
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          granted_at?: string | null
          granted_by?: number | null
          id?: number
          notes?: string | null
          permission_id?: string | null
          person_id?: number | null
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          granted_at?: string | null
          granted_by?: number | null
          id?: number
          notes?: string | null
          permission_id?: string | null
          person_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "people_permissions_granted_by_fkey"
            columns: ["granted_by"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "people_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "people_permissions_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
        ]
      }
      permissions: {
        Row: {
          created_at: string
          description: string | null
          id: string
          key: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          key?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          key?: string | null
        }
        Relationships: []
      }
      photos: {
        Row: {
          caption: string | null
          created_at: string
          id: number
          image_url: string | null
        }
        Insert: {
          caption?: string | null
          created_at?: string
          id?: number
          image_url?: string | null
        }
        Update: {
          caption?: string | null
          created_at?: string
          id?: number
          image_url?: string | null
        }
        Relationships: []
      }
      roles: {
        Row: {
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      teams: {
        Row: {
          created_at: string
          display_order: number | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          display_order?: number | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
