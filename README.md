# bblog
# Backbase Web Automation - Playwright

## Get Start 
- Install dependencies: npm install
- Install Playwright Browsers: npx playwright install --with-deps

## Run Test
- To trigger automation all tests: npx playwright test
- To trigger automation a single test file: npx playwright test {{filepath}} , example: playwright test article.spec.ts
- To trigger automation the test with the title: npx playwright test -g {{testtile}}, example: npx playwright test -g "Create - Verify user can create new article"
- To trigger automation test for specific tag: npx playwright test --grep "@{{tag_name}}", example: npx playwright test --grep "@CURD"

## CI - Github action
- CI flow will be triggered whenever have the pull request to main branch
- Artifact for automation test will be the playwright test report and be able to download/view after the test run is finished