export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      blood_requests: {
        Row: {
          blood_group: string
          contact_name: string
          contact_phone: string
          created_at: string
          hospital: string
          id: string
          patient_name: string
          urgency: string
        }
        Insert: {
          blood_group: string
          contact_name: string
          contact_phone: string
          created_at?: string
          hospital: string
          id?: string
          patient_name: string
          urgency: string
        }
        Update: {
          blood_group?: string
          contact_name?: string
          contact_phone?: string
          created_at?: string
          hospital?: string
          id?: string
          patient_name?: string
          urgency?: string
        }
        Relationships: []
      }
      club_activities: {
        Row: {
          created_at: string
          date: string
          description: string | null
          id: string
          location: string | null
          time: string | null
          title: string
        }
        Insert: {
          created_at?: string
          date: string
          description?: string | null
          id?: string
          location?: string | null
          time?: string | null
          title: string
        }
        Update: {
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          location?: string | null
          time?: string | null
          title?: string
        }
        Relationships: []
      }
      club_members: {
        Row: {
          blood_group: string
          date_of_birth: string | null
          email: string
          id: string
          name: string
          phone: string
          profile_picture_url: string | null
          registered_at: string
        }
        Insert: {
          blood_group: string
          date_of_birth?: string | null
          email: string
          id?: string
          name: string
          phone: string
          profile_picture_url?: string | null
          registered_at?: string
        }
        Update: {
          blood_group?: string
          date_of_birth?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string
          profile_picture_url?: string | null
          registered_at?: string
        }
        Relationships: []
      }
      public_blood_requests: {
        Row: {
          additional_notes: string | null
          blood_group: string
          created_at: string
          hospital: string
          id: string
          patient_name: string
          requester_email: string
          requester_name: string
          requester_phone: string
          urgency: string
        }
        Insert: {
          additional_notes?: string | null
          blood_group: string
          created_at?: string
          hospital: string
          id?: string
          patient_name: string
          requester_email: string
          requester_name: string
          requester_phone: string
          urgency: string
        }
        Update: {
          additional_notes?: string | null
          blood_group?: string
          created_at?: string
          hospital?: string
          id?: string
          patient_name?: string
          requester_email?: string
          requester_name?: string
          requester_phone?: string
          urgency?: string
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
