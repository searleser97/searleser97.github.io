# for i in range(1, 65):
#     print('hexagramNames[' + str(i) + '] = ')

i = 1
while True:
    try:
        print('hexagramDescription[' + str(i) + '] = \'' + input() + '\'')
        i += 1
    except:
        break
