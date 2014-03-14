import csv
import json
import codecs

data = open("./data/demo-data.csv", "rU")
reader = csv.DictReader(data, dialect="excel",delimiter=",", quotechar='"')

with codecs.open("./data/demo-data.json", "w") as out:
  for r in reader:
    for k, v in r.items():
      if not v:
        r[k] = None
    out.write(json.dumps(r)+','+"\n")