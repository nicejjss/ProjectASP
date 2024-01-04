# Web bán hàng sử dụng SAP.NET 6 MVC
- Luồng sử lý dữ liệu cơ bản: User->Routeing->Controller<->Model->View->User

## Thành phần chính
### Routing
- Dựa vào các request Để gọi các Controller

### Controller
- Thực hiện các logic code từ yêu cầu cảu request và trả về response

### View
- Giao diện HTML, CSS được trả về theo logic của controller

### Model
- Được sử dụng để tương tác với các trường dữ liệu của bảng (định nghĩa các field, primary keys, foreign key,...)
- Khi tương tác với các dữ liệu có thể viết vào 1 file Repository riêng

## Khác
### Repository 
- Nơi tương tác với các dữ liệu của thực thể
- Được sử dụng để lấy dữ liệu và tương tác với dữ liệu của table (create, read, update, delete)


# RULESET
 ## Push code và tạo merge request
   - Mỗi lần push code lên project cần tạo 1 pull request và set reviewer cho owner project

 ## Viết Script SQL trong folder SQL:
   - Mỗi một thay đổi trong SQL viết vào 1 file sql riêng có template:
      - 20240212_create_table.sql
   - Các TH viết file SQL mới:
     - Create, ALter, Delete,...

# GIT Flow
![git-flow-feature-branch](https://github.com/nicejjss/ProjectASP/assets/77496505/30101575-985d-4851-a043-7d11bc08ab0f)



# DOC: https://drive.google.com/drive/folders/1p1jBQ0WXVluZbx92vvBFwGFO9kM5cXkz?usp=drive_link
