import {Component, OnInit} from '@angular/core';
import {ITasks} from './itasks';

const TASKS = [
  {
    id: 1,
    name: 'Сделать уборку',
    time: 0,
    status: false
  },
  {
    id: 2,
    name: 'Сходитьв  магазин',
    time: 0,
    status: false
  },
  {
    id: 3,
    name: 'Покормить кота',
    time: 0,
    status: false
  }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string;

  // Массив наших данных тасков
  tasks: ITasks[];

  // Показывать или скрывать форму добавления
  showAddForm: boolean;
  id: number;
  name: string;
  time: number;
  status: boolean;

  ngOnInit(): void {
    this.title = 'Список задач';

    this.tasks = TASKS;

  }

  removeTask(i: number): void {
    this.tasks.splice(i, 1);
  }

  saveTask(id: number, name: string, time: number, status: boolean) {
    const addData: ITasks = {
      id: id ? id : this.tasks.length + 1,
      name,
      time,
      status
    };
    console.log('Сохраняем задачу');

    const saveTask = this.tasks.filter((task) => task.id === id);

    if (saveTask.length) {
      this.tasks.map((task) => {
        if (task.id === addData.id) {
          task.name = addData.name;
          task.time = addData.time;
          task.status = addData.status;
        }

        this.formReset();
        this.showAddForm = false;
      });
    } else {
      this.tasks.push(addData);
      this.formReset();
    }

  }

  private formReset(): void {
    console.log('Здесь мы сбрасыаем значения формы');
    this.id = null;
    this.name = '';
    this.time = null;
    this.status = null;
    // Скрыть форму
    this.showAddForm = false;
  }

  updateTask(id: number) {
    console.log('update ' + id);
    const currentTask = this.tasks.filter((task) => task.id === id);
    if (currentTask.length !== 0) {
      this.fillForm(currentTask[0]);
    } else {
      console.log('Элементс  таким айди не найден');
    }
  }

  private fillForm(task: ITasks) {
    console.log(task);

    this.id = task.id;
    this.name = task.name;
    this.time = task.time;
    this.status = task.status;
    this.showAddForm = true;
  }
}
