import math
import numpy as np
import bisect
from pylab import *
import matplotlib.pyplot as plt


n=11
basis=1
segment=[-1,2]

basis+=1

def function(x):
    #return sin(x)*x
   #return np.log(x) + 0.5*x
   return 0.5*(x**3)-0.6*(x**2) +x-1

def spline_builder( node_x, node_y,spline_x):
    a,b, c,d,e,h =[], [], [], [], [],[]
    x = node_x
    y = node_y
    k = len(x)
    a = [el for el in y]
    for i in range(1,k):
        h.append(x[i]-x[i-1])

    H = spline_matrix(h)

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
def spline_matrix(h):
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
    h=(segment[1]-segment[0])/(n-1)
    for i in range(1,n-1):
        res[i] = segment[0] + h*i
    res[n-1] = segment[1]
    return res

def ols(table,x):
    matrix = np.zeros((basis, basis))
    e=np.zeros(basis)

    for i in range(0,basis):
        for j in range(0,basis):
            a = 0
            b = 0
            for k in range(0,n):
                 a += math.pow(table[0, k], i) * math.pow(table[0, k], j)
                 b += table[1, k] * math.pow(table[0, k], i)
            matrix[i, j] = a
            e[i]=b
    c = np.linalg.solve(matrix, e)

    y=np.zeros(len(x))
    for i in range(0,len(x)):
        for j in range(0,basis):
            y[i]+=c[j]*math.pow(x[i],j)
    return y



def plot_result():

    node_x=nodes()
    node_y= function(node_x)

    x = np.arange(segment[0],segment[1], 0.01)

    funct_y=function(x)

    table = np.matrix([node_x,node_y])

#    b=np.polyfit(node_x,node_y,basis-1)

    spline_y = spline_builder(node_x,node_y,x)

 #   pol_y=ols(b[::-1],x)

    ols_y=ols(table,x)
    plt.plot(x,ols_y, label="g(x)",color='gray')
    plt.plot(node_x,node_y, "o",label="nodes")
    plt.plot(x,funct_y,label="f(x)",color='red')
    plt.plot(x,spline_y, label="s(x)",color='green')

    sigma=0
    ols_y=ols(table,node_x)
    for i in range(len(node_x)):
        sigma=sigma+math.pow(node_y[i]-ols_y[i],2)
    print(round(math.sqrt(sigma/(n+1-basis)),10))

 #   plt.plot(x,pol_y, label="g(x)",color='orange')

    plt.xlabel("x")
    plt.ylabel("y")

    plt.grid(True)
    plt.axis("equal")
    plt.legend()
    plt.show()

plot_result()


