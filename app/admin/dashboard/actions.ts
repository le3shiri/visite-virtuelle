"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// --- PROJECTS ---
export async function getProjects() {
  return await prisma.project.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function createProject(data: any) {
  const result = await prisma.project.create({ data })
  revalidatePath('/admin/dashboard')
  return result
}

export async function updateProject(id: string, data: any) {
  const result = await prisma.project.update({ where: { id }, data })
  revalidatePath('/admin/dashboard')
  return result
}

export async function deleteProject(id: string) {
  const result = await prisma.project.delete({ where: { id } })
  revalidatePath('/admin/dashboard')
  return result
}

// --- BLOG POSTS ---
export async function getBlogPosts() {
  return await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function createBlogPost(data: any) {
  const result = await prisma.blogPost.create({ data })
  revalidatePath('/admin/dashboard')
  return result
}

export async function updateBlogPost(id: string, data: any) {
  const result = await prisma.blogPost.update({ where: { id }, data })
  revalidatePath('/admin/dashboard')
  return result
}

export async function deleteBlogPost(id: string) {
  const result = await prisma.blogPost.delete({ where: { id } })
  revalidatePath('/admin/dashboard')
  return result
}

// --- BOOKINGS ---
export async function getBookings() {
  return await prisma.booking.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function updateBookingStatus(id: string, status: string) {
  const result = await prisma.booking.update({ where: { id }, data: { status } })
  revalidatePath('/admin/dashboard')
  return result
}

export async function deleteBooking(id: string) {
  const result = await prisma.booking.delete({ where: { id } })
  revalidatePath('/admin/dashboard')
  return result
}

// --- INQUIRIES ---
export async function getInquiries() {
  return await prisma.inquiry.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function markInquiryRead(id: string) {
  const result = await prisma.inquiry.update({ where: { id }, data: { isRead: true } })
  revalidatePath('/admin/dashboard')
  return result
}

export async function deleteInquiry(id: string) {
  const result = await prisma.inquiry.delete({ where: { id } })
  revalidatePath('/admin/dashboard')
  return result
}

// --- TESTIMONIALS ---
export async function getTestimonials() {
  return await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function updateTestimonialStatus(id: string, status: string) {
  const result = await prisma.testimonial.update({ where: { id }, data: { status } })
  revalidatePath('/admin/dashboard')
  return result
}

export async function deleteTestimonial(id: string) {
  const result = await prisma.testimonial.delete({ where: { id } })
  revalidatePath('/admin/dashboard')
  return result
}

// --- PRICING PLANS ---
export async function getPricingPlans() {
  return await prisma.pricingPlan.findMany({ orderBy: { order: 'asc' } })
}

export async function createPricingPlan(data: any) {
  const result = await prisma.pricingPlan.create({ data })
  revalidatePath('/admin/dashboard')
  return result
}

export async function updatePricingPlan(id: string, data: any) {
  const result = await prisma.pricingPlan.update({ where: { id }, data })
  revalidatePath('/admin/dashboard')
  return result
}

export async function deletePricingPlan(id: string) {
  const result = await prisma.pricingPlan.delete({ where: { id } })
  revalidatePath('/admin/dashboard')
  return result
}

// --- BLOCKED DATES ---
export async function getBlockedDates() {
  return await prisma.blockedDate.findMany({ orderBy: { date: 'asc' } })
}

export async function createBlockedDate(data: any) {
  const result = await prisma.blockedDate.create({ data })
  revalidatePath('/admin/dashboard')
  return result
}

export async function deleteBlockedDate(id: string) {
  const result = await prisma.blockedDate.delete({ where: { id } })
  revalidatePath('/admin/dashboard')
  return result
}

// --- TIME SLOTS ---
export async function getTimeSlots() {
  return await prisma.timeSlot.findMany({ orderBy: { time: 'asc' } })
}

export async function toggleTimeSlot(id: string, isActive: boolean) {
  const result = await prisma.timeSlot.update({ where: { id }, data: { isActive } })
  revalidatePath('/admin/dashboard')
  return result
}

export async function createTimeSlot(data: any) {
  const result = await prisma.timeSlot.create({ data })
  revalidatePath('/admin/dashboard')
  return result
}

export async function deleteTimeSlot(id: string) {
  const result = await prisma.timeSlot.delete({ where: { id } })
  revalidatePath('/admin/dashboard')
  return result
}

// --- OVERVIEW STATS ---
export async function getDashboardStats() {
  const [
    projectsCount,
    bookingsCount,
    inquiriesCount,
    blogPostsCount,
    pricingPlansCount
  ] = await Promise.all([
    prisma.project.count({ where: { status: 'PUBLISHED' } }),
    prisma.booking.count(),
    prisma.inquiry.count(),
    prisma.blogPost.count(),
    prisma.pricingPlan.count()
  ])
  
  const recentBookings = await prisma.booking.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' }
  })
  
  const recentInquiries = await prisma.inquiry.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' }
  })

  // Group bookings by status
  const bookingsStatusGroup = await prisma.booking.groupBy({
    by: ['status'],
    _count: { id: true }
  })

  return {
    kpis: {
      projectsCount,
      bookingsCount,
      inquiriesCount,
      blogPostsCount,
      pricingPlansCount
    },
    recentBookings,
    recentInquiries,
    bookingsStatusGroup
  }
}
