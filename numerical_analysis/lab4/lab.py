import math
import numpy as np
import bisect
from pylab import *
import matplotlib.pyplot as plt

n=30
segment=[-10,0]

def function(x):
    return 1+np.abs(np.sin(x))

def spline_builder( node_x, node_y,spline_x):
    a,b, c,d,e,h =[], [], [], [], [],[]
    x = node_x
    y = node_y
    k = len(x)
    a = [el for el in y]
    for i in range(1,k):
        h.append(x[i]-x[i-1])

    H = calc_matrix(h)

    e.append(0)
    for i in range(0,k - 2):
        e.append(3.0 * (y[i + 2] - y[i+1]) / h[i+1] - 3.0 * (y[i+1] - y[i]) / h[i])
    e.append(0)
    c = np.linalg.solve(H, e)

    result=[]

    for i in range(k-1):
        d.append((c[i+1] - c[i]) / (3.0 * h[i]))
        b.append((a[i+1] - a[i]) / h[i] - h[i] * (c[i + 1] + 2.0 * c[i]) / 3.0)
    for t in spline_x:
        if t < x[0]:
            result.append(None)
            continue
        elif t > x[-1]:
            result.append(None)
            continue
        i = bisect.bisect(x, t) - 1
        dx = t - x[i]
        result.append(a[i] + b[i] * dx +c[i] * dx ** 2.0 +d[i] * dx ** 3.0)

    return result


def calc_matrix(h):
    nx=len(h)+1
    matrix = np.zeros((nx, nx))
    matrix[0, 0] = 1.0

    for i in range(nx - 1):
        if i != (nx - 2):
            matrix[i + 1, i + 1] = 2.0 * (h[i] + h[i + 1])
        matrix[i + 1, i] = h[i]
        matrix[i, i + 1] = h[i]
    matrix[0, 1] = 0.0
    matrix[nx - 1, nx - 2] = 0.0
    matrix[nx - 1, nx - 1] = 1.0
    return matrix


def nodes():
    res = np.zeros(n)
    res[0]=segment[0]
    for i in range(1,n-1):
        res[i] = segment[0] + (segment[1] - segment[0] + 0.0) / n * (i)
    res[n-1]=segment[1]
    return res

def plot_result():
    node_x=nodes()
    node_y= function(node_x)

    funct_x= np.arange(segment[0],segment[1],0.01)
    funct_y=function(funct_x)


    spline_x = np.arange(segment[0],segment[1], 0.01)
    spline_y = spline_builder(node_x,node_y,spline_x)

    plt.plot(node_x,node_y, "o",label="nodes")

    plt.plot(funct_x,funct_y,label="f(x)",color='red')

    plt.plot(spline_x,spline_y, label="s(x)",color='green')

    plt.xlabel("x")
    plt.ylabel("y")

    plt.grid(True)
    plt.axis("equal")
    plt.legend()
    plt.show()

plot_result()


