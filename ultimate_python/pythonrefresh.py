# VARIABLE
age = 21
name="Lisa"
# print("Hello my name is {} and I am {} years old".format(name, age))

if age < 25:
    print('You are young')


def hello(name, age):
    return 'Hello {} you are {} years old'.format(name, age)

sentence = hello('Lisa', 21)
print(sentence)

# LIST
dognames = ["Fido", "Sean", "Sally", "Mark"]

dognames.insert(0, "Jane")
print(dognames)

print(dognames[2])

print(len(dognames))

dognames[1] = "Lilo"
print(dognames)

# FOR LOOP
for dog in dognames:
    print(dog)


for x in range(1,10):
    print(x)

age = 0

# WHILE LOOP
while age < 18:
    print(age)
    age += 1

numbers = [76, 83, 16, 69, 52, 78, 10, 77, 45, 52, 32, 17, 58, 54, 79, 72, 55, 50, 81, 74, 45, 33, 38, 10, 40, 44, 70, 81, 79, 28, 83, 41, 14, 16, 27, 38, 20, 84, 24, 50, 59, 71, 1, 13, 56, 91, 29, 54, 65, 23, 60, 57, 13, 39, 58, 94, 94, 42, 46, 58, 59, 29, 69, 60, 83, 9, 83, 5, 64, 70, 55, 89, 67, 89, 70, 8, 90, 17, 48, 17, 94, 18, 98, 72, 96, 26, 13, 7, 58, 67, 38, 48, 43, 98, 65, 8, 74, 44, 92]

for number in numbers:
    if number > 90:
        print(number)

# LIBRARY
dogs = {"Fido":8, "Sally":17, "Sean":2}

print(dogs["Sally"])
dogs["Sarah"] = 6
print(dogs)

# CLASS
class Dog:

    dogInfo = "Hey dogs are cool!"

    def bark(self, str): # self as the first parameter then you can add something for the second parameter
        print('BARK!' + str)

mydog = Dog()
mydog.bark("bark bark bark bark")
mydog.name = "Fido"
mydog.age = 16
print(mydog.name)
print(mydog.age)

Dog.dogInfo = "Hey there"
print(Dog.dogInfo)


class Horse:

    def __init__(self, name, age, furcolor): # you can call 'self' anything as long as it's the same everywhere
        self.name = name
        self.age = age
        self.furcolor = furcolor

    def neigh(self):
        print("NEIGH!")

myhorse = Horse("Joker", 7, "Brown")
print(myhorse.age)
