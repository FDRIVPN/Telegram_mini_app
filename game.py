import pygame

# تنظیمات اولیه
pygame.init()

# ایجاد صفحه به صورت تمام صفحه
screen = pygame.display.set_mode((0, 0), pygame.FULLSCREEN)
WIDTH, HEIGHT = screen.get_size()

pygame.display.set_caption("بازی سکه")

# رنگ‌ها
BLACK = (0, 0, 0)

# بارگذاری تصویر پس‌زمینه و سکه
background_image = pygame.transform.scale(pygame.image.load('background.jpg'), (WIDTH, HEIGHT))
coin_image = pygame.transform.scale(pygame.image.load('ggg.png'), (600, 600))
coin_rect = coin_image.get_rect()

# بارگذاری تصاویر دیگر
images = [pygame.transform.scale(pygame.image.load(f'image{i}.png'), (140, 140)) for i in range(1, 5)]

# تنظیم موقعیت تصاویر در پایین صفحه
image1_rect = images[0].get_rect(midbottom=(WIDTH * 0.2, HEIGHT - 60))
image2_rect = images[1].get_rect(midbottom=(WIDTH * 0.4, HEIGHT - 60))
image3_rect = images[2].get_rect(midbottom=(WIDTH * 0.6, HEIGHT - 60))
image4_rect = images[3].get_rect(midbottom=(WIDTH * 0.8, HEIGHT - 60))

image_rects = [image1_rect, image2_rect, image3_rect, image4_rect]

# بارگذاری تصاویر برای صفحه جدید
new_background_image = pygame.transform.scale(pygame.image.load('new_background.jpg'), (WIDTH, HEIGHT))
new_image1 = pygame.transform.scale(pygame.image.load('new_image1.png'), (200, 200))
new_image2 = pygame.transform.scale(pygame.image.load('new_image2.png'), (200, 200))

# تنظیم موقعیت تصاویر جدید
new_image1_rect = new_image1.get_rect(center=(WIDTH // 2, HEIGHT // 3))
new_image2_rect = new_image2.get_rect(topleft=(20, HEIGHT // 2 - 140))  # تصویر جدید بالا

# تصویر سمت چپ
side_image1 = pygame.transform.scale(pygame.image.load('side_image1.png'), (140, 140))  # تصویر سمت چپ
side_image1_rect = side_image1.get_rect(topleft=(20, HEIGHT // 2 + 70))  # پایین‌تر از new_image2

# دکمه برگشت
back_button_rect = pygame.Rect(WIDTH // 2 - 70, HEIGHT - 60 - 20, 140, 40)  # 20 پیکسل بالاتر از پایین

# حالت بازی
MAIN_MENU = 0
NEW_SCREEN = 1
game_state = MAIN_MENU

# تابع برای قرار دادن سکه در مرکز صفحه
def center_coin():
    coin_rect.center = (WIDTH // 2, HEIGHT // 1.8)

# قرار دادن سکه در مرکز صفحه
center_coin()

# کلاس برای نمایش عدد +1
class PlusOne:
    def __init__(self, position):
        self.x, self.y = position
        self.start_time = pygame.time.get_ticks()
        self.duration = 1000
        self.fade_duration = 1000
        self.initial_y = position[1]
        self.max_height = self.initial_y - 150
        self.alpha = 255

    def update(self):
        elapsed_time = (pygame.time.get_ticks() - self.start_time) / self.duration
        if elapsed_time < 1:
            self.y = self.initial_y - (150 * elapsed_time)
            return True
        else:
            fade_time = (pygame.time.get_ticks() - self.start_time - self.duration) / self.fade_duration
            if fade_time < 1:
                self.alpha = 255 - (255 * fade_time)
                self.y = self.max_height
                return True
            return False

    def draw(self, surface):
        font = pygame.font.Font(None, 120)
        text = font.render("+1", True, (255, 255, 255))
        text.set_alpha(self.alpha)
        text_rect = text.get_rect(center=(self.x, self.y))
        surface.blit(text, text_rect)

# کلاس برای مدیریت کلیک‌ها
class ClickManager:
    def __init__(self):
        self.plus_ones = []

    def handle_click(self, position):
        self.plus_ones.append(PlusOne(position))

    def update(self):
        for plus_one in self.plus_ones[:]:
            if not plus_one.update():
                self.plus_ones.remove(plus_one)

    def draw(self, surface):
        for plus_one in self.plus_ones:
            plus_one.draw(surface)

# متغیرها
score = 0
running = True
click_manager = ClickManager()
clock = pygame.time.Clock()

# تابع برای نمایش امتیاز
def show_score():
    font = pygame.font.Font(None, 146)
    text = font.render(f"{score}", True, (255, 255, 255))
    text_rect = text.get_rect(center=(coin_rect.centerx, coin_rect.top - 140))
    screen.blit(text, text_rect)

# حلقه اصلی بازی
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
            
        if event.type == pygame.MOUSEBUTTONDOWN:
            mouse_x, mouse_y = event.pos
            if game_state == MAIN_MENU:
                if coin_rect.collidepoint(mouse_x, mouse_y):
                    score += 1
                    click_manager.handle_click((mouse_x, mouse_y))
                if image1_rect.collidepoint(mouse_x, mouse_y):  # کلیک روی تصویر اول
                    game_state = NEW_SCREEN
            elif game_state == NEW_SCREEN:
                if new_image1_rect.collidepoint(mouse_x, mouse_y):
                    score += 1000  # اضافه کردن ۱۰۰۰ سکه به امتیاز
                    click_manager.handle_click((mouse_x, mouse_y))
                if new_image2_rect.collidepoint(mouse_x, mouse_y):
                    score += 1000  # اضافه کردن ۱۰۰۰ سکه به امتیاز
                    click_manager.handle_click((mouse_x, mouse_y))
                if side_image1_rect.collidepoint(mouse_x, mouse_y):
                    score += 500  # اضافه کردن ۵۰۰ سکه به امتیاز
                    click_manager.handle_click((mouse_x, mouse_y))
                if back_button_rect.collidepoint(mouse_x, mouse_y):  # کلیک روی دکمه برگشت
                    game_state = MAIN_MENU

    # رسم صفحه بر اساس حالت بازی
    if game_state == MAIN_MENU:
        screen.blit(background_image, (0, 0))
        screen.blit(coin_image, coin_rect)
        for img, rect in zip(images, image_rects):
            screen.blit(img, rect)
        show_score()
        click_manager.update()
        click_manager.draw(screen)
    elif game_state == NEW_SCREEN:
        screen.blit(new_background_image, (0, 0))
        screen.blit(new_image1, new_image1_rect)
        screen.blit(new_image2, new_image2_rect)
        screen.blit(side_image1, side_image1_rect)
        
        # رسم دکمه برگشت
        pygame.draw.rect(screen, (200, 0, 0), back_button_rect)  # رنگ دکمه
        font = pygame.font.Font(None, 36)
        text = font.render("برگشت", True, (255, 255, 255))
        text_rect = text.get_rect(center=back_button_rect.center)
        screen.blit(text, text_rect)

    pygame.display.flip()
    # تنظیم نرخ فریم به 60 FPS
    clock.tick(60)

pygame.quit()
