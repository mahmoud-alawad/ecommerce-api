import { Category, PrismaClient, Product, Purchase } from '@prisma/client';
import { Request, Response } from 'express';
import PrismaService from '../util/prismaService';


export default class Dashboard {
  // public categories: Category[];
  // public pruchases: Purchase[];
  public prisma: PrismaClient
  constructor() {
    this.prisma = PrismaService;
  }

  /**
   * @param req
   * @param res
   * get
  */
  public async getProducts(req: Request, res: Response) {
    const products = await PrismaService.product.findMany() as Product[];
    if (products === undefined) {
      res.status(400).json({ msg: "no products" })
    } else {
      res.status(200).json({ products: products })
    }
  }
  /**
   * @param req
   * @param res
   * get
  */
  public async getCategories(req: Request, res: Response) {
    const categories = await PrismaService.category.findMany() as Category[];
    if (categories === undefined) {
      res.status(400).json({ msg: "no categories" })
    } else {
      res.status(200).json({ categories: categories })
    }
  }
}
