import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getPanels().map((panel) => {
      return db.panel.create({ data: panel });
    })
  );
}

seed();

function getPanels() {
  return [
    {
      title: "Momo X Okarun",
      description: "One of the best ive seen in a while",
      image:
        "https://i.pinimg.com/564x/47/8c/f4/478cf4314c0129090ddf3906b9c6969b.jpg",
    },
    {
      title: "The Honored One",
      description: "Gojo being Gojo",
      image:
        "https://i.pinimg.com/564x/7f/24/f8/7f24f84ce0be56c5d118612fe03ea693.jpg",
    },
    {
      title: "Power X Denji",
      description: "is anyone else crying rn ?",
      image:
        "https://i.pinimg.com/564x/26/2b/a9/262ba9452b6fba7047a8db17c437e594.jpg",
    },
    {
      title: "Flashy Huh ?",
      description: "uruma is awesome",
      image:
        "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    },
    {
      title: "The Alarm Clock Is Still Ringing, Cant You Hear It ?",
      description: "If you havent picked this up yet, you should",
      image:
        "https://i.pinimg.com/564x/f0/92/62/f09262b22a3a0f52eac29932273256d2.jpg",
    },
    {
      title: "I am a hero...",
      description: "I love this manga",
      image:
        "https://i.pinimg.com/564x/fe/fc/ab/fefcab7e744ff332f34fa223d53ebd9c.jpg",
    },
  ];
}
