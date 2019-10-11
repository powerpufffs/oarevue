npm run build
[-d "./dist/img" ] && rm -rf dist/img
mkdir dist/img
cp src/assets/* dist/img
cd ..
[ -d "./oare/dist" ] && rm -rf oare/dist
cp -r oarevue/dist oare/
cd oarevue