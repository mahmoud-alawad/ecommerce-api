import { PrismaClient } from '@prisma/client';
import crypto, { randomInt } from 'crypto';

const prisma = new PrismaClient();
const algorithm = 'sha256';

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, algorithm)
    .toString('hex');
  return { hash, salt };
}
const hassedPassword = hashPassword('password');
function generateSku() {
  var length = 8,
    charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    retVal = '';
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

async function main() {
  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 20; j++) {
      const randkey = randomInt(0, 1000000);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      // const product = await prisma.product.upsert({
      //   where: { id: j * i },toString()
      //     description: 'This is a description'
      //   },
      // });
    }
  }
  for (let g = 1; g <= 10; g++) {
    const randkey = randomInt(0, 1000000);
    const hashedPassword = 'password';

    const productsEn = await prisma.product.create({
      data: {
        name: 'product english' + g,
        sku: generateSku(),
        description: 'some description on product english',
        stock: 0,
        urlName: 'product_en_' + g,
        basePrice: +'99.' + g * 1,
        language: 'EN',
      },
    });
    const productsAr = await prisma.product.create({
      data: {
        name: 'alomntaj arabic' + g,
        sku: generateSku(),
        description: 'almontage desc arabic',
        stock: 0,
        urlName: 'almontage_ar_' + g,
        basePrice: +'99.' + g * 1,
        language: 'AR',
      },
    });

    const productsDe = await prisma.product.create({
      data: {
        name: 'product de' + g,
        sku: generateSku(),
        description: 'product desc in DE',
        stock: 0,
        urlName: 'product_de_' + g,
        basePrice: +'99.' + g * 1,
        language: 'DE',
      },
    });

    const productsIt = await prisma.product.create({
      data: {
        name: 'product it' + g,
        sku: generateSku(),
        description: 'product desc in IT',
        stock: 0,
        urlName: 'product_IT_' + g,
        basePrice: +'99.' + g * 1,
        language: 'IT',
      },
    });

    const user = await prisma.user.create({
      data: {
        name: `us${g}r ${g + 1}`,
        email: `user.${g}@gmail.com`,
        password: hassedPassword.hash,
        salt: hassedPassword.salt,
        address: 'somewher 23',
        role: 'USER',
        phoneNumber: '121212',
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const address = prisma.adress.upsert({
    //   where: { id: g.toString() },
    //   update: {},
    //   create: {
    //     streetNumber: g,
    //     addressLine: 'address' + g,
    //     city: 'city' + g,
    //     region: 'region' + g,
    //     postalCode: g + 1,
    //     countryId: 'CI',
    //   },
    // });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
