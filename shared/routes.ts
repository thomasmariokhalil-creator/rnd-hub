import { z } from 'zod';
import { 
  announcements, menuItems, clubs, sportsEvents, schoolEvents, featuredContent,
  insertAnnouncementSchema, insertMenuItemSchema, insertClubSchema, insertSportsEventSchema, insertSchoolEventSchema, insertFeaturedContentSchema
} from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  announcements: {
    list: {
      method: 'GET' as const,
      path: '/api/announcements',
      responses: {
        200: z.array(z.custom<typeof announcements.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/announcements/:id',
      responses: {
        200: z.custom<typeof announcements.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  menu: {
    list: {
      method: 'GET' as const,
      path: '/api/menu',
      responses: {
        200: z.array(z.custom<typeof menuItems.$inferSelect>()),
      },
    },
  },
  clubs: {
    list: {
      method: 'GET' as const,
      path: '/api/clubs',
      responses: {
        200: z.array(z.custom<typeof clubs.$inferSelect>()),
      },
    },
  },
  sports: {
    list: {
      method: 'GET' as const,
      path: '/api/sports',
      responses: {
        200: z.array(z.custom<typeof sportsEvents.$inferSelect>()),
      },
    },
  },
  events: {
    list: {
      method: 'GET' as const,
      path: '/api/events',
      responses: {
        200: z.array(z.custom<typeof schoolEvents.$inferSelect>()),
      },
    },
  },
  featured: {
    list: {
      method: 'GET' as const,
      path: '/api/featured',
      responses: {
        200: z.array(z.custom<typeof featuredContent.$inferSelect>()),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
