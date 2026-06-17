import {
    Users,
    BookOpen,
    Calendar,
    Globe,
    Award,
    Video,
    Target,
    Heart,
    Star,
    Sparkles,
    CheckCircle,
    Eye,
    Zap,
    Languages,
    GraduationCap,
    HelpCircle,
    User,
    DollarSign,
    Clock,
} from "lucide-react";

const iconsMap = {
    // General Features
    "expert-instructors-icon": Users,
    "interactive-lessons-icon": Video,
    "flexible-scheduling-icon": Calendar,
    "cultural-immersion-icon": Globe,
    "personalized-learning-icon": Target,
    "global-community-icon": Heart,

    // Mission Features
    "tech-icon": Zap,
    "personalized-icon": Users,
    "dialect-icon": Languages,

    // Vision Features
    "global-icon": Globe,
    "bridge-icon": Heart,
    "immersion-icon": Star,

    // Vision Image Badges
    "globe-icon": Globe,
    "heart-icon": Heart,
    "star-icon": Star,

    // FAQ Categories
    "users-icon": Users,
    "user-icon": User,
    "dollar-icon": DollarSign,
    "clock-icon": Clock,
    "help-icon": HelpCircle,

    // Fallback
    default: Sparkles,
};

export const getIcon = (iconName) => iconsMap[iconName] || iconsMap.default;