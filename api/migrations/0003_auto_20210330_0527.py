# Generated by Django 2.2.13 on 2021-03-30 05:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_product'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='image',
            new_name='archivo',
        ),
    ]