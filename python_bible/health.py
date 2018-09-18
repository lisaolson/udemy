import random

health = 50

difficulty = 1

potion_health = int(random.randint(25,50) / difficulty)
print(potion_health)

health = health + potion_health
print(health)

