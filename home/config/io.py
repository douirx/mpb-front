import os

#Read Configurations files
def readTxt(file):
    dico = {}
    with open(file) as f:
        for line in f:
            tb = line.replace("\n", "")
            tb = tb.split(":")
            try:
                dico[tb[0]] = int(tb[1])
            except ValueError:
                dico[tb[0]] = tb[1]

    return dico


pconfig = os.path.abspath(os.path.join(os.path.dirname(__file__), "../txt"))