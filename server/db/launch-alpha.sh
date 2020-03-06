BULK_DATA_DIR="./out/0"

load_data () {
  dgraph bulk -s /dgraph/data/recipedia.schema -f /dgraph/data/recipedia.rdf --zero=zero:5080
}

run_alpha () {
  dgraph alpha --my=alpha:7080 --lru_mb=2048 --zero=zero:5080 -p "${BULK_DATA_DIR}/p"
}

if [[ -d "${BULK_DATA_DIR}" ]]; then
  echo "Bulkloader data found. Skipping load"
  run_alpha
else
  echo "Loading data..."
  load_data && run_alpha
fi
