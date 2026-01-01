import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

// Announcements
export function useAnnouncements() {
  return useQuery({
    queryKey: [api.announcements.list.path],
    queryFn: async () => {
      const res = await fetch(api.announcements.list.path);
      if (!res.ok) throw new Error("Failed to fetch announcements");
      return api.announcements.list.responses[200].parse(await res.json());
    },
  });
}

export function useAnnouncement(id: number) {
  return useQuery({
    queryKey: [api.announcements.get.path, id],
    queryFn: async () => {
      const res = await fetch(api.announcements.get.path.replace(":id", String(id)));
      if (!res.ok) throw new Error("Failed to fetch announcement");
      return api.announcements.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

// Menu Items
export function useMenu() {
  return useQuery({
    queryKey: [api.menu.list.path],
    queryFn: async () => {
      const res = await fetch(api.menu.list.path);
      if (!res.ok) throw new Error("Failed to fetch menu");
      return api.menu.list.responses[200].parse(await res.json());
    },
  });
}

// Clubs
export function useClubs() {
  return useQuery({
    queryKey: [api.clubs.list.path],
    queryFn: async () => {
      const res = await fetch(api.clubs.list.path);
      if (!res.ok) throw new Error("Failed to fetch clubs");
      return api.clubs.list.responses[200].parse(await res.json());
    },
  });
}

// Sports
export function useSports() {
  return useQuery({
    queryKey: [api.sports.list.path],
    queryFn: async () => {
      const res = await fetch(api.sports.list.path);
      if (!res.ok) throw new Error("Failed to fetch sports events");
      return api.sports.list.responses[200].parse(await res.json());
    },
  });
}

// Events
export function useEvents() {
  return useQuery({
    queryKey: [api.events.list.path],
    queryFn: async () => {
      const res = await fetch(api.events.list.path);
      if (!res.ok) throw new Error("Failed to fetch school events");
      return api.events.list.responses[200].parse(await res.json());
    },
  });
}

// Featured
export function useFeatured() {
  return useQuery({
    queryKey: [api.featured.list.path],
    queryFn: async () => {
      const res = await fetch(api.featured.list.path);
      if (!res.ok) throw new Error("Failed to fetch featured content");
      return api.featured.list.responses[200].parse(await res.json());
    },
  });
}
