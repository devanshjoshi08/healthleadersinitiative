import {
  Activity,
  Stethoscope,
  GraduationCap,
  HeartHandshake,
  Users,
  ClipboardCheck,
  UserPlus,
  Clock,
  Compass,
  Sparkles,
  ShieldPlus,
  TrendingUp,
  HeartPulse,
  Cross,
  Microscope,
  BookOpen,
  Calendar,
  MapPin,
  Mail,
  MessageSquare,
  Send,
  ArrowRight,
  type LucideProps,
} from "lucide-react";

const map = {
  Activity,
  Stethoscope,
  GraduationCap,
  HeartHandshake,
  Users,
  ClipboardCheck,
  UserPlus,
  Clock,
  Compass,
  Sparkles,
  ShieldPlus,
  TrendingUp,
  HeartPulse,
  Cross,
  Microscope,
  BookOpen,
  Calendar,
  MapPin,
  Mail,
  MessageSquare,
  Send,
  ArrowRight,
} as const;

export type IconName = keyof typeof map;

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = map[name as IconName] ?? Activity;
  return <Cmp {...props} />;
}
