import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  scent: string;
  story: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Noir Ambré',
    price: 4500,
    description: 'Глубокий аромат янтаря и пачули',
    image: 'https://cdn.poehali.dev/projects/3987a860-f7a1-4967-b613-8aab456d435e/files/e52c45a5-ad5a-4991-bdfc-8f8cea4e6a48.jpg',
    scent: 'Древесный, теплый',
    story: 'Вдохновлен ночными прогулками по старинным улочкам Парижа, где аромат старинных библиотек смешивается с запахом дождя.'
  },
  {
    id: 2,
    name: 'Vanille Céleste',
    price: 3800,
    description: 'Нежная ваниль с нотами кашемира',
    image: 'https://cdn.poehali.dev/projects/3987a860-f7a1-4967-b613-8aab456d435e/files/57491c13-12bd-4959-8d71-13f40772e62a.jpg',
    scent: 'Сладкий, обволакивающий',
    story: 'Создан под впечатлением от утреннего света, проникающего сквозь шелковые занавеси. Аромат уюта и нежности.'
  },
  {
    id: 3,
    name: 'Ébène Mystique',
    price: 5200,
    description: 'Эбеновое дерево и черная орхидея',
    image: 'https://cdn.poehali.dev/projects/3987a860-f7a1-4967-b613-8aab456d435e/files/d9fdcf81-5b0e-4995-b23a-e6fc09a8d97d.jpg',
    scent: 'Экзотический, насыщенный',
    story: 'Рожден из воспоминаний о путешествии в джунгли Азии, где древние храмы хранят секреты столетий.'
  }
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('home');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-cormorant font-semibold tracking-wide">Lumière</h1>
          <div className="hidden md:flex gap-8">
            <button
              onClick={() => setActiveSection('home')}
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Главная
            </button>
            <button
              onClick={() => setActiveSection('catalog')}
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Каталог
            </button>
            <button
              onClick={() => setActiveSection('about')}
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              О бренде
            </button>
            <button
              onClick={() => setActiveSection('delivery')}
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Доставка
            </button>
            <button
              onClick={() => setActiveSection('contact')}
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Контакты
            </button>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Icon name="ShoppingBag" size={20} />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-accent text-xs">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle className="font-cormorant text-2xl">Корзина</SheetTitle>
              </SheetHeader>
              <div className="mt-8 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                ) : (
                  <>
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-4 border-b pb-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-cormorant font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-7 w-7"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Icon name="Minus" size={14} />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-7 w-7"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Icon name="Plus" size={14} />
                            </Button>
                          </div>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Icon name="X" size={18} />
                        </Button>
                      </div>
                    ))}
                    <div className="pt-4 space-y-4">
                      <div className="flex justify-between text-lg font-medium">
                        <span>Итого:</span>
                        <span>{totalPrice.toLocaleString()} ₽</span>
                      </div>
                      <Button className="w-full" size="lg">
                        Оформить заказ
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </header>

      <main>
        {activeSection === 'home' && (
          <div className="animate-fade-in">
            <section className="container mx-auto px-4 py-20 md:py-32">
              <div className="max-w-3xl mx-auto text-center space-y-6">
                <h2 className="text-5xl md:text-7xl font-cormorant font-light tracking-wide">
                  Искусство аромата
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Каждая свеча — это история, рассказанная через аромат. Мы создаём не просто свечи, 
                  мы создаём атмосферу, воспоминания и эмоции.
                </p>
                <Button
                  size="lg"
                  className="mt-8"
                  onClick={() => setActiveSection('catalog')}
                >
                  Исследовать коллекцию
                </Button>
              </div>
            </section>

            <section className="bg-secondary py-16">
              <div className="container mx-auto px-4">
                <h3 className="text-3xl font-cormorant text-center mb-12">Избранная коллекция</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {products.map(product => (
                    <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow animate-scale-in">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-cover"
                      />
                      <CardContent className="p-6 space-y-3">
                        <h4 className="text-2xl font-cormorant">{product.name}</h4>
                        <p className="text-sm text-muted-foreground">{product.description}</p>
                        <div className="flex items-center justify-between pt-4">
                          <span className="text-lg font-medium">{product.price} ₽</span>
                          <Button onClick={() => addToCart(product)}>
                            <Icon name="Plus" size={16} className="mr-2" />
                            В корзину
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {activeSection === 'catalog' && (
          <section className="container mx-auto px-4 py-16 animate-fade-in">
            <h2 className="text-4xl font-cormorant text-center mb-12">Каталог</h2>
            <Tabs defaultValue="all" className="max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="all">Все</TabsTrigger>
                <TabsTrigger value="woody">Древесные</TabsTrigger>
                <TabsTrigger value="sweet">Сладкие</TabsTrigger>
                <TabsTrigger value="exotic">Экзотические</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {products.map(product => (
                  <Card key={product.id} className="overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                    <CardContent className="p-6 space-y-3">
                      <h4 className="text-2xl font-cormorant">{product.name}</h4>
                      <Badge variant="outline">{product.scent}</Badge>
                      <p className="text-sm text-muted-foreground">{product.description}</p>
                      <p className="text-xs text-muted-foreground italic">{product.story}</p>
                      <div className="flex items-center justify-between pt-4">
                        <span className="text-lg font-medium">{product.price} ₽</span>
                        <Button onClick={() => addToCart(product)}>
                          <Icon name="Plus" size={16} className="mr-2" />
                          В корзину
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </section>
        )}

        {activeSection === 'about' && (
          <section className="container mx-auto px-4 py-16 animate-fade-in">
            <div className="max-w-3xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-cormorant">О бренде Lumière</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Философия создания ароматов, которые рассказывают истории
                </p>
              </div>

              <div className="prose prose-lg max-w-none space-y-8">
                <div>
                  <h3 className="text-2xl font-cormorant mb-4">Наша философия</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Каждая свеча Lumière — это не просто источник света и аромата. Это путешествие, 
                    застывшее в воске. Мы верим, что запахи обладают уникальной способностью переносить 
                    нас во времени и пространстве, пробуждая глубокие воспоминания и эмоции.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-cormorant mb-4">История создания</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Бренд родился из страсти к путешествиям и искусству парфюмерии. Основательница, 
                    проведя годы в поисках редких эссенций по всему миру, решила запечатлеть свои 
                    впечатления в форме свечей. Каждый аромат в коллекции — это дневниковая запись, 
                    момент, место, эмоция.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-cormorant mb-4">Мастерство создания</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Мы используем только натуральный соевый воск и эфирные масла высочайшего качества. 
                    Каждая свеча создаётся вручную в нашей мастерской, где древние техники соединяются 
                    с современными технологиями. Процесс создания одного аромата может занимать месяцы — 
                    мы не торопим искусство.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'delivery' && (
          <section className="container mx-auto px-4 py-16 animate-fade-in">
            <div className="max-w-2xl mx-auto space-y-8">
              <h2 className="text-4xl font-cormorant text-center">Доставка</h2>
              
              <Card className="p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <Icon name="Truck" size={24} className="text-accent mt-1" />
                  <div>
                    <h3 className="font-medium mb-2">По Москве</h3>
                    <p className="text-sm text-muted-foreground">
                      Курьерская доставка в день заказа при оформлении до 14:00. Стоимость: 500 ₽. 
                      Бесплатно при заказе от 5000 ₽.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Icon name="MapPin" size={24} className="text-accent mt-1" />
                  <div>
                    <h3 className="font-medium mb-2">По России</h3>
                    <p className="text-sm text-muted-foreground">
                      Доставка СДЭК и Почтой России. Срок доставки 3-7 дней. Стоимость рассчитывается 
                      при оформлении заказа.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Icon name="Package" size={24} className="text-accent mt-1" />
                  <div>
                    <h3 className="font-medium mb-2">Упаковка</h3>
                    <p className="text-sm text-muted-foreground">
                      Каждая свеча упаковывается в фирменную коробку с лентой. Возможна подарочная 
                      упаковка с персональной открыткой.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}

        {activeSection === 'contact' && (
          <section className="container mx-auto px-4 py-16 animate-fade-in">
            <div className="max-w-2xl mx-auto space-y-8">
              <h2 className="text-4xl font-cormorant text-center">Контакты</h2>
              
              <Card className="p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <Icon name="Mail" size={24} className="text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <a href="mailto:hello@lumiere.ru" className="font-medium hover:text-accent transition-colors">
                      hello@lumiere.ru
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Icon name="Phone" size={24} className="text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Телефон</p>
                    <a href="tel:+79991234567" className="font-medium hover:text-accent transition-colors">
                      +7 (999) 123-45-67
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Icon name="MapPin" size={24} className="text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Шоурум</p>
                    <p className="font-medium">Москва, ул. Тверская, 10</p>
                    <p className="text-sm text-muted-foreground mt-1">Пн-Сб: 11:00 - 20:00</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-3">Социальные сети</p>
                  <div className="flex gap-4">
                    <Button variant="outline" size="icon">
                      <Icon name="Instagram" size={20} />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Icon name="Facebook" size={20} />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}
      </main>

      <footer className="bg-primary text-primary-foreground py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-cormorant mb-4">Lumière</h2>
          <p className="text-sm opacity-80">Искусство аромата с 2024</p>
        </div>
      </footer>
    </div>
  );
}
