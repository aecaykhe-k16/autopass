;(async function () {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  async function handleSurveys() {
    try {
      let surveys = Array.from(document.querySelectorAll('.item.clearfix'))
      const processedSurveys = new Set() // Tập hợp lưu các khảo sát đã xử lý

      while (surveys.length > 0) {
        for (let survey of surveys) {
          if (processedSurveys.has(survey)) {
            continue // Bỏ qua khảo sát đã xử lý
          }

          const link = survey.querySelector('a') // Lấy link của khảo sát
          if (link) {
            // Mở popup
            const popup = window.open(
              link.href,
              '_blank',
              'width=800,height=600',
            )
            if (popup) {
              // Chờ popup load xong
              await new Promise((resolve) => {
                const interval = setInterval(() => {
                  if (popup.document.readyState === 'complete') {
                    clearInterval(interval)
                    resolve()
                  }
                }, 500)
              })

              // Thực hiện logic trên popup
              await handleSurveyPage(popup)

              // Đóng popup
              popup.close()
            } else {
              console.error(
                'Không thể mở popup. Hãy kiểm tra cài đặt trình duyệt.',
              )
            }

            // Thêm khảo sát vào danh sách đã xử lý
            processedSurveys.add(survey)

            // Chờ 3 giây trước khi xử lý khảo sát tiếp theo
            await delay(3000)
          }
        }

        // Cập nhật lại danh sách khảo sát
        surveys = Array.from(
          document.querySelectorAll('.item.clearfix'),
        ).filter((survey) => !processedSurveys.has(survey))
      }

      // Hiển thị alert khi hoàn thành tất cả khảo sát
      alert(
        'Tất cả các khảo sát đã được hoàn thành! Nhấn "OK" để tải lại trang.',
      )
      location.reload() // Tải lại trang
    } catch (err) {
      console.error('Đã xảy ra lỗi:', err)
    }
  }

  async function handleSurveyPage(popup) {
    try {
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

      // Chờ thêm để chắc chắn trang đã tải đầy đủ
      await delay(2000)

      // Sử dụng logic trong context của popup
      const radDisElements = popup.document.querySelectorAll('.rad-dis')
      radDisElements.forEach((el) => el.click())

      const checkboxes = popup.document.querySelectorAll(
        "input[type='checkbox']",
      )
      for (let i = 4; i < checkboxes.length; i += 5) {
        checkboxes[i].click()
      }

      const inputFeedback = popup.document.querySelector('.input-ykien')
      if (inputFeedback) {
        inputFeedback.value = 'Không'
      }

      const submitButton = popup.document.querySelector('.btn_submit_boxes')
      if (submitButton) {
        submitButton.click()
      }

      // Chờ để đảm bảo hoàn thành submit trước khi đóng popup
      await delay(3000)
    } catch (err) {
      console.error('Lỗi khi xử lý khảo sát trong popup:', err)
    }
  }

  // Gọi hàm xử lý khảo sát
  await handleSurveys()
})()
