import math
import numpy as np
import bisect
from pylab import *
import matplotlib.pyplot as plt

n=100
a=np.pi
b=0
segment=[a,b]
h = abs((b - a) /n)
def func(x):
    return sin(x**2)

def get_x(b,a,N):
    average = float((b - a) / N)
    x = [a]
    for i in range(1, N + 1):
        x.append(round(a + average * i, 5))
    return x

def print_plot():
    if(n%2==0):N=n
    else: N = 2*n

    x = np.arange(segment[0],segment[1], 0.01)
    y_spec=func(x)
    y1=sympson_method(x,0)

    plt.plot(x, y_spec, 'g-', label='f(x)')
    plt.plot(x, y1, 'r-', label='S(x)')
    plt.xlabel("x")
    plt.ylabel("y")

    plt.grid(True)
    plt.axis("equal")
    plt.legend()
    plt.show()


def trapezoid():
    h = abs((b - a) / n)
    x=list()
    x=get_x(b,a,n)
    y_trap=list()
    for i in range(n+1):
        y_trap.append(round(func(x[i]),5))

    res=(y_trap[0]+y_trap[n])/2
    for i in range(1,n):
        res+=y_trap[i]
    print(x)
    print(y_trap)
    return res*h

def sympson_method(vect,a):
    result=[]

    for b in vect:
        if(n%2==0): N=n
        else: N=2*n
        x=list()
        x=get_x(b,a,n)
        y_spec=list()
        for i in range(N+1):
            y_spec.append(round(func(x[i]),5))
        res=y_spec[0]+y_spec[N]

        print(y_spec)
        for i in range(1,N):
            if(i%2==0):
                res+=2*y_spec[i]
            else: res+=4*y_spec[i]
            print(res)
        result.append(res*h/3)

    return result

def rect_method():
    h = abs((b - a) /n)
    x = list()
    x = get_x(b,a,n)
    y_spec = list()
    res=0
    for i in range(n):
        y_spec.append(round(func(x[i]+h/2),5))
    for i in range(n):
        res+=y_spec[i]
    return res*h


def sympson_method2():
    x = list()
    x = get_x(b,a,n)
    y_spec = list()
    res=0

    if(n%2==0): N=n
    else: N=2*n
    x=list()
    x=get_x(b,a,n)
    y_spec=list()
    for i in range(N+1):
        y_spec.append(round(func(x[i]),5))
    res=y_spec[0]+y_spec[N]

    print(y_spec)
    for i in range(1,N):
        if(i%2==0):
            res+=2*y_spec[i]
        else: res+=4*y_spec[i]
    print(res*h/3)


def get_y(x):
    y = list()
    for i in range(n + 1):
        y.append(func(x[i]))
    return y




if __name__ == "__main__":
    print("Tapetion:",trapezoid())
    print("Rect:",rect_method())
    print("Rect:",sympson_method2())
    print_plot()
