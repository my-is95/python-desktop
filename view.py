import eel
import sqlite3
import sys

def create_database():
    dbname = "database.db"  # 空のデータベースを作成
    c = sqlite3.connect(dbname) # 作成した空のデータベースに接続
    c.execute("PRAGMA foreign_keys = 1")    # デフォルトでは外部キーの使用が無効なため、有効にする
    # 既にデータベースが登録されている場合は、ddlの発行でエラーが出るのでexceptブロックで回避する
    try:
        # itemテーブルの定義
        ddl = """
        CREATE TABLE profile
        (
            profile_id INTEGER PRIMARY KEY AUTOINCREMENT,
            profile_name TEXT NOT NULL UNIQUE,
            name TEXT NOT NULL,
            email TEXT NOT NULL
        )
        """
        # SQLの発行
        c.execute(ddl)
        print("テーブルが生成されました")
    except:
        print("何らかのエラーでテーブルが生成されませんでした")
        pass
    

@eel.expose
def add_billing_to_profile_tbl(profile_name, name, email):
    dbname = "database.db"  
    c = sqlite3.connect(dbname) # データベースに接続
    dml = "INSERT INTO profile(profile_name,name,email) VALUES ('{}', '{}', '{}');".format(profile_name, name, email)
    c.execute(dml)
    c.execute("COMMIT;")
    print(dml)


@eel.expose
def display_billing_from_profile_tbl():
    dbname = "database.db"  
    c = sqlite3.connect(dbname) # データベースに接続
    li = []
    dml = """
        SELECT * FROM profile;
    """
    for r in c.execute(dml):
        li.append(r)
        print(r)
    return tuple(li)


'sato@example'
@eel.expose
def edit_billing_to_profile_tbl(profile_id, profile_name, name, email):
    print(str(profile_id) + " がPythonで認識されました")
    dbname = "database.db"  
    c = sqlite3.connect(dbname) # データベースに接続
    dml = "UPDATE profile SET profile_name = '{}', name = '{}', email = '{}' WHERE profile_id = {}".format(profile_name, name, email, profile_id)
    c.execute(dml)
    c.execute("COMMIT;")


@eel.expose
def remove_billing_from_profile_tbl(profile_id):
    print(str(profile_id) + " がPythonで認識されました")
    dbname = "database.db"  
    c = sqlite3.connect(dbname) # データベースに接続
    dml = "DELETE FROM profile WHERE profile_id = " + str(profile_id)
    c.execute(dml)
    c.execute("COMMIT;")


@eel.expose
def remove_all_billing_from_profile_tbl():
    dbname = "database.db"  
    c = sqlite3.connect(dbname) # データベースに接続
    dml = """
        DELETE FROM profile;
    """
    c.execute(dml)
    c.execute("COMMIT;")    # DMLの実行を確定させる
    print(dml)


def onCloseWindow(page, sockets):
	print(page + 'が閉じられました。プログラムを終了します。')
	sys.exit()

def main():
    eel.init("web")
    eel.start("main.html", close_callback=onCloseWindow)


if __name__ == "__main__":
    create_database()
    main()