"use client";

import { useFCM } from "../../libs/shared/notification";

export default function NotificationsInit() {
  useFCM();
  return null;
}
