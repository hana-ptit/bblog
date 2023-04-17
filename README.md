# bblog
# Backbase Web Automation - Playwright

## Get Start 
- Install dependencies: npm ci
- Install Playwright Browsers: npx playwright install --with-deps

## Run Test
- To trigger automation test for regression: npm run test:regression
- To trigger automation test for specific tag: npx playwright test --workers 16 --grep @{{tag_name}}

## CI - Github action
- CI flow will be triggered whenever have the pull request to main branch
- Artifact for automation test will be the playwright test report and be able to download/view after the test run is finished