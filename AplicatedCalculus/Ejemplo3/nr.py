def dx(f, x, coefs):
    return abs(0 - f(x, coefs))


def newtons_method(f, df, x0, e, coefs):
    delta = dx(f, x0, coefs)
    count = 0
    while delta > e:
        x0 = x0 - f(x0, coefs) / df(x0, coefs)
        delta = dx(f, x0, coefs)
        count += 1
    print (count, 'Root is at: ', x0)
    # print ('f(x) at root is: ', f(x0, l))


def f(x, coefs):
    ans = 0
    n = len(coefs) - 1
    for a in coefs:
        ans += a * x**n
        n -= 1
    return ans


def df(x, coefs):
    ans = 0
    coefs = coefs[:-1]
    n = len(coefs)
    for a in coefs:
        ans += a * n * x**(n - 1)
        n -= 1
    return ans


if __name__ == '__main__':
    coefs = input()

    coefs = list(map(int, coefs.split()))
    print(coefs)

    # x0s = range(complex(-0.5, 1), complex(1, 0))
    # x0s = [complex(-0.5, 1)]
    x0s = [0.5]
    for x0 in x0s:
        newtons_method(f, df, x0, 1e-5, coefs)
