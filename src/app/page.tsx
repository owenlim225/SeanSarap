"use client";

import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import {
  INVENTORY,
  CATEGORY_LABELS,
  type Category,
  type DessertItem,
} from "@/data/inventory";

function formatPeso(value: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

const CATEGORY_ORDER: Category[] = ["cold", "pastry", "kakanin"];

const CARD_BG: Record<Category, string> = {
  cold: "bg-ube/20",
  pastry: "bg-cheese/30",
  kakanin: "bg-strawberry/20",
};

function DessertCard({ item }: { item: DessertItem }) {
  const { addItem } = useCart();
  const bg = CARD_BG[item.category];

  return (
    <Card
      className={`${bg} group transition-all duration-200 ease-out hover:-translate-y-2 hover:translate-x-2 hover:shadow-[12px_12px_0_0_rgba(0,0,0,1)]`}
    >
      {item.image && (
        <div className="relative aspect-4/3 w-full overflow-hidden border-b-4 border-black">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-lg">{item.name}</CardTitle>
        <p className="text-muted-foreground text-sm">{item.serving}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{item.description}</p>
        <p className="mt-2 font-bold">{formatPeso(item.price)}</p>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full transition-transform duration-150 ease-out hover:scale-[1.02] active:scale-[0.98]"
          variant="ube"
          onClick={() => addItem(item.id, 1)}
        >
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function Home() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 border-b-4 border-black pb-2 text-3xl font-bold shadow-brutal bg-cheese/40 p-4">
        Filipino Desserts
      </h1>
      <Tabs defaultValue="cold" className="w-full">
        <TabsList className="mb-6 w-full flex-wrap justify-start gap-2 border-4 border-black shadow-brutal">
          {CATEGORY_ORDER.map((cat) => (
            <TabsTrigger key={cat} value={cat} className="font-bold">
              {CATEGORY_LABELS[cat]}
            </TabsTrigger>
          ))}
        </TabsList>
        {CATEGORY_ORDER.map((cat) => (
          <TabsContent key={cat} value={cat} className="mt-0">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {INVENTORY.filter((d) => d.category === cat).map((item) => (
                <DessertCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
