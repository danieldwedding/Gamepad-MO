export class Console {
    constructor() {
        this.buttons = [
            "button_1",
            "button_2",
            "button_3",
            "button_4",

            "shoulder_top_left",
            "shoulder_top_right",
            "shoulder_bottom_left",
            "shoulder_bottom_right",

            "select",
            "start",

            "stick_button_left",
            "stick_button_right",
            "stick_axis_left",
            "stick_axis_right",

            "d_pad_up",
            "d_pad_down",
            "d_pad_left",
            "d_pad_right",
            "vendor"
        ];

        this.activeButtons = {
            "button_1": false,
            "button_2": false,
            "button_3": false,
            "button_4": false,

            "shoulder_top_left": false,
            "shoulder_top_right": false,
            "shoulder_bottom_left": false,
            "shoulder_bottom_right": false,

            "select": false,
            "start": false,

            "stick_button_left": false,
            "stick_button_right": false,
            "stick_axis_left": false,
            "stick_axis_right": false,

            "d_pad_up": false,
            "d_pad_down": false,
            "d_pad_left": false,
            "d_pad_right": false,
            "vendor": false
        };
    }
}