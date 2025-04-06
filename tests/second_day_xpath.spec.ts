import { test, expect } from '@playwright/test';

test('Add new candidates', async ({ page }) => {
    await page.goto('https://buianthai.online/orangehrm/web/index.php/auth/login');
  
    // fill login information
    await page.locator("//*[@id='app']/div[1]/div/div[1]/div/div[2]/div[2]/form/div[1]/div/div[2]/input").fill("TinaNguyen");
    await page.locator("//*[@id='app']/div[1]/div/div[1]/div/div[2]/div[2]/form/div[2]/div/div[2]/input").fill("Admin@1234");
    await page.locator("//*[@id='app']/div[1]/div/div[1]/div/div[2]/div[2]/form/div[3]/button").click();
  
    // check header. Default is "Dashboard" screen.
    await page.waitForSelector("//*[@id='app']/div[1]/div[1]/header/div[1]/div[1]/span/h6");
    await expect(page.locator("//*[@id='app']/div[1]/div[1]/header/div[1]/div[1]/span/h6")).toHaveText(/Dashboard/i);
    await page.locator("//*[@id='app']/div[1]/div[1]/aside/nav/div[2]/ul/li[5]/a/span").click();
    await page.locator("//*[@id='app']/div[1]/div[2]/div[2]/div/div[2]/div[1]/button").click();
    await page.waitForSelector("//*[@id='app']/div[1]/div[2]/div[2]/div/div/h6");
    await expect(page.locator("//*[@id='app']/div[1]/div[2]/div[2]/div/div/h6")).toHaveText(/Add Candidate/i);
    // fill fullname area
    await page.locator("//*[@id='app']/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div/div/div[2]/div[1]/div[2]/input").fill("Hang");
    await page.locator("//*[@id='app']/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div/div/div[2]/div[2]/div[2]/input").fill("Thi");
    await page.locator("//*[@id='app']/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div/div/div[2]/div[3]/div[2]/input").fill("Nguyen");
    // email
    await page.locator("//*[@id='app']/div[1]/div[2]/div[2]/div/div/form/div[3]/div/div[1]/div/div[2]/input").fill("hangnt@gmail.com");
    // contact
    await page.locator("//*[@id='app']/div[1]/div[2]/div[2]/div/div/form/div[3]/div/div[2]/div/div[2]/input").fill("0987123456");
    // keywords
    await page.locator("//*[@id='app']/div[1]/div[2]/div[2]/div/div/form/div[5]/div/div[1]/div/div[2]/input").fill("Nguyen, Thi, Hang");
    // Date of application
    await page.locator("//*[@id='app']/div[1]/div[2]/div[2]/div/div/form/div[5]/div/div[2]/div/div[2]/div/div/input").fill("2025-04-05");
    // Note
    await page.locator("//*[@id='app']/div[1]/div[2]/div[2]/div/div/form/div[6]/div/div/div/div[2]/textarea").fill("Hang test add new candidate");
    // click save
    await page.locator("//*[@id='app']/div[1]/div[2]/div[2]/div/div/form/div[8]/button[2]").click();
    await page.waitForSelector("//*[@id='app']/div[1]/div[2]/div[2]/div[1]/form/h6");
    await expect(page.locator("//*[@id='app']/div[1]/div[2]/div[2]/div[1]/form/h6")).toHaveText(/Application Stage/i);
    // verify output
    await expect(page.locator("//*[@id='app']/div[1]/div[2]/div[2]/div[1]/form/div[1]/div[1]/div/div[2]/p")).toHaveText(/Hang Thi Nguyen/i);
    // back to list candidate
    await page.locator("//*[@id='app']/div[1]/div[1]/header/div[2]/nav/ul/li[1]/a").click();
    // search latest created candidate 
    await page.locator("//*[@id='app']/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[2]/div/div[2]/div/div[2]/input").fill("thi");
    await page.locator("//*[@id='app']/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[4]/button[2]").click();
    await page.waitForSelector("//*[@id='app']/div[1]/div[2]/div[2]/div/div[2]/div[2]/div/span");
    await expect(page.locator("//*[@id='app']/div[1]/div[2]/div[2]/div/div[2]/div[2]/div/span")).toHaveText('(1) Record Found');

    // delete record
    await page.locator(".bi-trash").click();
    await page.locator("//*[@id='app']/div[3]/div/div/div/div[3]/button[2]").click();
    await page.waitForSelector("//*[@id='app']/div[1]/div[2]/div[2]/div/div[2]/div[2]/div/span");
    await expect(page.locator("//*[@id='app']/div[1]/div[2]/div[2]/div/div[2]/div[2]/div/span")).toHaveText('No Records Found');
    

    // // log-out
    await page.locator("//*[@id='app']/div[1]/div[1]/header/div[1]/div[3]/ul/li/span").click();
    await page.locator("//*[@id='app']/div[1]/div[1]/header/div[1]/div[3]/ul/li/ul/li[4]/a").click();
    // Check log-out
    await expect(page).toHaveURL(/auth\/login/);
  });

  test('Add new candidates without xpath', async ({ page }) => {
    await page.goto('https://buianthai.online/orangehrm/web/index.php/auth/login');
  
    // fill login information
    await page.fill("input[name='username']", 'TinaNguyen');
    await page.fill("input[name='password']", 'Admin@1234');
    await page.click("button[type='submit']");
  
    // check header. Default is "Dashboard" screen.
    await page.waitForSelector(".oxd-topbar-header-title");
    await expect(page.locator(".oxd-topbar-header-title")).toHaveText(/Dashboard/i);
    await page.click("text=Recruitment");
    await page.click("text=Add");
    await page.waitForSelector(".orangehrm-main-title");
    await expect(page.locator(".orangehrm-main-title")).toHaveText(/Add Candidate/i);
    // fill fullname area
    await page.locator(".orangehrm-firstname").fill("Hang");
    await page.locator(".orangehrm-middlename").fill("Thi");
    await page.locator(".orangehrm-lastname").fill("Nguyen");
    // email
    await page.locator("//*[@id='app']/div[1]/div[2]/div[2]/div/div/form/div[3]/div/div[1]/div/div[2]/input").fill("hangnt@gmail.com");
    // contact
    await page.locator("//*[@id='app']/div[1]/div[2]/div[2]/div/div/form/div[3]/div/div[2]/div/div[2]/input").fill("0987123456");
    // keywords
    await page.getByPlaceholder("Enter comma seperated words...").fill("Nguyen, Thi, Hang");
    // Date of application
    await page.locator("//*[@id='app']/div[1]/div[2]/div[2]/div/div/form/div[5]/div/div[2]/div/div[2]/div/div/input").fill("2025-04-05");
    // Note
    await page.locator(".oxd-textarea--resize-vertical").fill("Hang test add new candidate");
    // click save
    await page.locator(".orangehrm-left-space").click();
    // verify output
    await page.waitForSelector("//*[@id='app']/div[1]/div[2]/div[2]/div[1]/form/div[1]/div[1]/div/div[2]/p");
    await expect(page.locator("//*[@id='app']/div[1]/div[2]/div[2]/div[1]/form/div[1]/div[1]/div/div[2]/p")).toHaveText('Hang Thi Nguyen');
    // back to list candidate
    await page.locator(".--visited").click();
    // search latest created candidate 
    await page.getByPlaceholder("Enter comma seperated words...").fill("thi");
    await page.locator(".orangehrm-left-space").click();
    await page.waitForSelector("//*[@id='app']/div[1]/div[2]/div[2]/div/div[2]/div[2]/div/span");
    await expect(page.locator(".orangehrm-vertical-padding")).toHaveText('(1) Record Found');

    // delete record
    await page.locator(".bi-trash").click();
    await page.locator("//*[@id='app']/div[3]/div/div/div/div[3]/button[2]").click();
    await expect(page.locator(".orangehrm-vertical-padding")).toHaveText('No Records Found');
    // // log-out
    await page.click(".oxd-userdropdown-tab");
    await page.click("text=Logout");
    // Check log-out
    await expect(page).toHaveURL(/auth\/login/);
  });