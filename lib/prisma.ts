// Mock prisma client to avoid build errors when @prisma/client is removed
const mockModel = {
  findMany: async () => [],
  findUnique: async () => null,
  findFirst: async () => null,
  create: async () => ({}),
  update: async () => ({}),
  delete: async () => ({}),
  count: async () => 0,
  groupBy: async () => [],
  upsert: async () => ({}),
};

const prisma: any = {
  project: mockModel,
  booking: mockModel,
  blockedDate: mockModel,
  timeSlot: mockModel,
  testimonial: mockModel,
  blogPost: mockModel,
  inquiry: mockModel,
  settings: mockModel,
  pack: mockModel,
  pricingPlan: mockModel,
}

export default prisma
