import { Component, OnInit } from "@angular/core";
import { ThemePalette } from "@angular/material/core";
import { ProgressSpinnerMode } from "@angular/material/progress-spinner";

@Component({
  selector: "app-progress-spinner",
  templateUrl: "./progress-spinner.component.html",
  styleUrls: ["./progress-spinner.component.scss"],
})
export class ProgressSpinnerComponent implements OnInit {
  color = "#ffffff";
  mode: ProgressSpinnerMode = "indeterminate";
  value = 10;

  constructor() {}

  ngOnInit(): void {}
}
