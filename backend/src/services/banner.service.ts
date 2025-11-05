import prisma from '../config/database';
import { CreateBannerDTO, UpdateBannerDTO } from '../types';
import { AppError } from '../middlewares/error.middleware';

export class BannerService {
  async getAllBanners(includeInactive = false) {
    const where = includeInactive ? {} : { isActive: true };

    const banners = await prisma.banner.findMany({
      where,
      orderBy: { displayOrder: 'asc' },
    });

    return banners;
  }

  async getBannerById(id: string) {
    const banner = await prisma.banner.findUnique({
      where: { id },
    });

    if (!banner) {
      throw new AppError('Banner no encontrado', 404);
    }

    return banner;
  }

  async createBanner(data: CreateBannerDTO) {
    const banner = await prisma.banner.create({
      data: {
        title: data.title,
        imageUrl: data.imageUrl,
        linkUrl: data.linkUrl,
        displayOrder: data.displayOrder || 0,
      },
    });

    return banner;
  }

  async updateBanner(id: string, data: UpdateBannerDTO) {
    const existingBanner = await prisma.banner.findUnique({
      where: { id },
    });

    if (!existingBanner) {
      throw new AppError('Banner no encontrado', 404);
    }

    const banner = await prisma.banner.update({
      where: { id },
      data,
    });

    return banner;
  }

  async deleteBanner(id: string) {
    const banner = await prisma.banner.findUnique({
      where: { id },
    });

    if (!banner) {
      throw new AppError('Banner no encontrado', 404);
    }

    await prisma.banner.delete({
      where: { id },
    });

    return { message: 'Banner eliminado exitosamente' };
  }
}