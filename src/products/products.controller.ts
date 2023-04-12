import { Category, Language, PrismaClient, Product, Purchase } from '@prisma/client';
import { Request, Response } from 'express';
import PrismaService from '../util/prismaService';
import Redis from '../util/redis';

/**
 * @param req
 * @param res
 * get
*/
const getProducts = async (req: Request, res: Response) => {
  let language = req.query.lang?.toString().toUpperCase() || 'IT',
    limit = Number(req.query.limit) || 0;

  const languages: Language[] = ['IT', 'EN', 'DE', 'AR'];

  let products: Product[] | undefined = undefined;
  const lang = languages.find(lang => lang === language) !== undefined ? languages.find(lang => lang === language) : null;
  let limitedProducts: Product[] = [];

  if (lang) {
    products = await PrismaService.product.findMany({ where: { language: lang } }) as Product[]
    products.sort();

    for (let i = 1; i < products.length; i++) {
      const element = products[i];
      limitedProducts.push(element);
      if (i === limit) {
        break;
      }
    }

    return res.json(limitedProducts)
  }

  products = await PrismaService.product.findMany();

  if (products === undefined || !products.length) {
    return res.status(400).json({ msg: "no products" })
  }

  return res.status(200).json({ products: products })

}

/**
 * 
 * @param req 
 * @param res 
 * @returns Single Product
 */
async function bySku(req: Request, res: Response) {
  const { sku } = req.params;
  console.log(sku);
  if (sku.length <= 0 ) return ;

  const product = await PrismaService.product.findFirst({ where: { sku } })
  if (!product) return res.status(400).json({ message: 'not found' })
  res.status(200).json(product);
}

/**
 * @param req
 * @param res
 * get
*/
const getCategories = async (_req: Request, res: Response) => {
  const categories = await PrismaService.category.findMany() as Category[];
  if (categories === undefined) {
    res.status(400).json({ msg: "no categories" })
  } else {
    res.status(200).json({ categories: categories })
  }
}
function generateSku() {
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}
export {
  getProducts,
  getCategories,
  bySku,
  generateSku
}
