"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartSheetContent } from "@/components/CartSheetContent";

function formatPeso(value: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function Navbar() {
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full border-b-4 border-black bg-background shadow-brutal">
      <div className="flex h-14 items-center justify-between px-4">
        <a href="/" className="text-xl font-bold">
          Sean Sarap
        </a>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="size-5" />
              {cartCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -right-2 -top-2 size-5 rounded-none p-0 text-xs"
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </Badge>
              )}
              <span className="sr-only">Open cart</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Cart</SheetTitle>
            </SheetHeader>
            <CartSheetContent formatPeso={formatPeso} />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
