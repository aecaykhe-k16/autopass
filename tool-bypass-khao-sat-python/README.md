# Project Setup and Execution

## Prerequisites

- Ensure you have `data.csv` file in the project directory with the format: `username,password`.
- Ensure `data.csv` is not empty.

## Setup Instructions

1. **Update and Install Python3:**

   ```bash
   sudo apt update
   sudo apt install python3 python3-pip -y
   ```

2. **Install Required Python Libraries:**

   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Python Script:**

   ```bash
   python3 main.py
   ```

## Notes

- The script checks for the existence and non-emptiness of `data.csv`.
- Ensure that `requirements.txt` contains all the necessary Python libraries for the project.
