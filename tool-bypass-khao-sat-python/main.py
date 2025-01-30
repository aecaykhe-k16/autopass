from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import csv


def login_and_navigate(username, password):
    driver = webdriver.Chrome()

    try:
        while True:
            driver.get("https://sv.iuh.edu.vn/sinh-vien-dang-nhap.html")
            time.sleep(1)

            username_field = driver.find_element(By.ID, "UserName")
            username_field.send_keys(username)

            password_field = driver.find_element(By.ID, "Password")
            password_field.send_keys(password)

            print("Vui lòng nhập CAPTCHA hiển thị trên trang web.")
            captcha_code = input("Nhập mã CAPTCHA: ")

            captcha_field = driver.find_element(By.ID, "Captcha")
            captcha_field.send_keys(captcha_code)

            login_button = driver.find_element(
                By.CSS_SELECTOR, "input[type='submit'][value='Đăng nhập']")
            login_button.click()

            time.sleep(1)

            if "khao-sat" in driver.current_url:
                driver.get("https://sv.iuh.edu.vn/sinh-vien/khao-sat.html")
                time.sleep(1)  # Đợi trang tải

                while True:
                    list_survey = driver.find_elements(
                        By.CSS_SELECTOR, "#tab_chuaks .row .col-md-12")
                    if not list_survey:
                        break  # Exit the loop if no more surveys are found

                    for survey in list_survey:
                        survey.click()
                        time.sleep(1)  # Wait for the survey page to load

                        rad_dis_elements = driver.find_elements(
                            By.CLASS_NAME, 'rad-dis')
                        for element in rad_dis_elements:
                            driver.execute_script(
                                "arguments[0].click();", element)

                        checkbox_elements = driver.find_elements(
                            By.CSS_SELECTOR, 'input[type="checkbox"]')
                        for i in range(4, len(checkbox_elements), 5):
                            driver.execute_script(
                                "arguments[0].click();", checkbox_elements[i])

                        input_ykien = driver.find_element(
                            By.CLASS_NAME, 'input-ykien')
                        driver.execute_script(
                            "arguments[0].value = 'Không';", input_ykien)

                        # Click submit button
                        submit_button = driver.find_element(
                            By.CLASS_NAME, 'btn_submit_boxes')
                        driver.execute_script(
                            "arguments[0].click();", submit_button)
                        print("Đã khảo sát xong")

                        time.sleep(2)  # Wait for the redirection to complete

                break  # Exit the loop if login is successful

            else:
                driver.quit()
                print("Không có khảo sát nào cần thực hiện")
                break
    except Exception as e:
        print(f"Đã xảy ra lỗi: {e}")

    finally:
        driver.quit()


if __name__ == "__main__":
    with open('data.csv', mode='r') as file:
        csv_reader = csv.reader(file)
        next(csv_reader)
        for row in csv_reader:
            username, password = row
            print(
                f"Đang đăng nhập với tài khoản: {username} và mật khẩu: {password}")
            login_and_navigate(username, password)
