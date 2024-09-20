"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ShoppingCart, User, LogIn, Plus, Minus, Trash2 } from "lucide-react";

// Mock data for food items
const foodItems = [
  {
    id: 1,
    name: "Fresh Salad",
    price: 8.99,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Chicken Sandwich",
    price: 10.99,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Fruit Bowl",
    price: 6.99,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Veggie Wrap",
    price: 9.99,
    image: "/placeholder.svg?height=100&width=100",
  },
];

interface FoodItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem extends FoodItem {
  quantity: number;
}

export default function SmartFridgeEcommerce() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("browse");
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleGoogleLogin = () => {
    // Implement Google login logic here
    console.log("Google login clicked");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const addToCart = (item: FoodItem) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart(cart.filter((item) => item.id !== id));
    } else {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeFromCart = (id: any) => {
    setCart(cart.filter((item: any) => item.id !== id));
  };

  const calculateSubtotal = () =>
    cart.reduce((sum: any, item: any) => sum + item.price * item.quantity, 0);
  const calculateTax = () => calculateSubtotal() * 0.1; // Assuming 10% tax
  const calculateTotal = () => calculateSubtotal() + calculateTax();

  const totalItems = cart.reduce(
    (sum: any, item: any) => sum + item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Smart Fridge Eats
          </h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => setActiveTab("cart")}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Cart ({totalItems})
            </Button>
            {isLoggedIn ? (
              <Button variant="ghost" onClick={handleLogout}>
                <User className="mr-2 h-4 w-4" />
                Logout
              </Button>
            ) : (
              <Button variant="ghost" onClick={() => setActiveTab("login")}>
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="browse">Browse Food</TabsTrigger>
            <TabsTrigger value="cart">Cart</TabsTrigger>
            <TabsTrigger value="login">Login / Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="browse">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {foodItems.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                    <CardDescription>${item.price.toFixed(2)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-40 object-cover rounded-md"
                    />
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => addToCart(item)}>
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="cart">
            <Card>
              <CardHeader>
                <CardTitle>Your Cart</CardTitle>
                <CardDescription>
                  Review your items and checkout
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cart.map((item: any) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span>{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>${item.price.toFixed(2)}</TableCell>
                        <TableCell>
                          ${(item.price * item.quantity).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (10%):</span>
                    <span>${calculateTax().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Proceed to Checkout</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login or Sign Up</CardTitle>
                <CardDescription>
                  Access your account or create a new one
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Email" type="email" />
                <Input placeholder="Password" type="password" />
                <Button className="w-full" onClick={() => setIsLoggedIn(true)}>
                  Login
                </Button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogleLogin}
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="google"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                  >
                    <path
                      fill="currentColor"
                      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                    ></path>
                  </svg>
                  Google
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
