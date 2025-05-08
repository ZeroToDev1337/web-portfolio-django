from django.db import models


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    # Метод для отображения имени тэга в Админке или в консоли
    def __str__(self):
        return self.name


class Project(models.Model):

    # Категория тегов на выбор
    CATEGORY_CHOICE = [
        ('web', 'Веб-разработка'),
        ('landing', 'Лендинг'),
        ('wp', 'Word-Press'),
        ('django', 'Django'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/')
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICE, default='web')
    tags = models.ManyToManyField(Tag)
    create_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title