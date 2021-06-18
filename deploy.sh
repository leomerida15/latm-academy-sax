#
git add .
#
git commit -m "deploy"
#
npm run build
#
mv dist ../latam-Academy-Back
#
cd ../latam-Academy-Back
#
rm -r public
#
mv dist public