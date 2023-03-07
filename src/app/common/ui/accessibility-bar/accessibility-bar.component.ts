import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IAccessibilityButtonConfig } from '../../interfaces/IAccessibilityButtonConfig';
import { LocalStorageService } from '../../service/LocalStorageService';
import { AccessibilityButtonEnum } from '../../enums/AccessibilityButton.enum';

@Component({
  selector: 'app-accessibility-bar',
  templateUrl: './accessibility-bar.component.html',
  styleUrls: ['./accessibility-bar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccessibilityBarComponent implements OnInit {

  public accessibilityButtonConfig: IAccessibilityButtonConfig[] = [
    {
      name: AccessibilityButtonEnum.NormalFont,
      title: "Ustaw normalną wielkość fontu",
      icon: 'mg-normal-font',
      backgroundColor: 'transparent',
      color: null,
      selected: true
    },
    {
      name: AccessibilityButtonEnum.BiggerFont,
      title: 'Ustaw większą wielkość fontu',
      icon: 'mg-bigger-font',
      backgroundColor: 'transparent',
      color: null
    },
    {
      name: AccessibilityButtonEnum.BiggestFont,
      title: 'Ustaw najwięszką wielkość fontu',
      icon: 'mg-biggest-font',
      backgroundColor: 'transparent',
      color: null,
    },
    {
      name: AccessibilityButtonEnum.BoldFont,
      title: 'Ustaw / Usuń pogrubienie fontu',
      icon: 'mg-bold-font',
      backgroundColor: 'transparent',
      color: null,
    },
    {
      name: AccessibilityButtonEnum.Hyperlink,
      title: 'Ustaw / usuń podkreślenie linków',
      icon: 'mg-hyperlink',
      backgroundColor: 'transparent',
      color: null,
    },
    {
      name: AccessibilityButtonEnum.ResetContrast,
      title: 'Przywróć domyślny kontrast',
      icon: 'mg-reset-contrast',
      backgroundColor: 'transparent',
      color: null,
    },
    {
      name: AccessibilityButtonEnum.BlackWhite,
      title: 'Ustaw kontrast czarny i biały',
      icon: 'mg-eye',
      backgroundColor: '#ffffff',
      color: '#3B3B3B'
    },
    {
      name: AccessibilityButtonEnum.WhiteBlack,
      title: 'Ustaw kontrast biały i czarny',
      icon: 'mg-eye',
      backgroundColor: '#3B3B3B',
      color: '#ffffff'
    },
    {
      name: AccessibilityButtonEnum.BlackYellow,
      title: 'Ustaw kontrast czarny i zółty',
      icon: 'mg-eye',
      backgroundColor: '#FFFF00',
      color: '#3B3B3B'
    },
    {
      name: AccessibilityButtonEnum.YellowBlack,
      title: 'Ustaw kontrast czarny i biały',
      icon: 'mg-eye',
      backgroundColor: '#3B3B3B',
      color: '#FFFF00'
    },
  ]

  private _accessibilitySettings = {
    fontSize: '16px',
    fontWeight: '400',
    textDecoration: 'none',
    color: '#3B3B3B',
    mainColor: '#FAF1E6',
    backgroundColor: '#FDFAF6'
  }

  constructor(
    private readonly _localStorageService: LocalStorageService
  ) {
  }

  public ngOnInit(): void {
    this.getAccessibilitySettings();
  }

  public changeAccessibilityValue(type: AccessibilityButtonEnum): void {
    switch (type) {
      case AccessibilityButtonEnum.NormalFont: {
        this.setPropertyBodyStyle('fontSize', '16px', this.setLocalStorage)
      }
        break;
      case AccessibilityButtonEnum.BiggerFont: {
        this.setPropertyBodyStyle('fontSize', '22px', this.setLocalStorage)
      }
        break;
      case AccessibilityButtonEnum.BiggestFont: {
        this.setPropertyBodyStyle('fontSize', '26px', this.setLocalStorage)
      }
        break;
      case AccessibilityButtonEnum.BoldFont: {
        const fontWeight = this._accessibilitySettings.fontWeight === '400' ? '700' : '400';
        this.setPropertyBodyStyle('fontWeight', fontWeight, this.setLocalStorage)
      }
      break;
      case AccessibilityButtonEnum.Hyperlink: {
       const textDecoration = this._accessibilitySettings.textDecoration === 'none' ? 'underline' : 'none';
       this.setPropertyBodyStyle('textDecoration', textDecoration, this.setLocalStorage)
      }
      break;
      case AccessibilityButtonEnum.ResetContrast: {
        this.setPropertyBodyStyle('color', '#3B3B3B');
        this.setPropertyBodyStyle('backgroundColor', '#FDFAF6');
        this.setPropertyBodyStyle('mainColor', '#FAF1E6');
      }
      break;
      case AccessibilityButtonEnum.BlackWhite: {
        this.setPropertyBodyStyle('color', '#000000');
        this.setPropertyBodyStyle('backgroundColor', '#FFFFFF');
        this.setPropertyBodyStyle('mainColor', '#FFFFFF');
      }
      break;
      case AccessibilityButtonEnum.WhiteBlack: {
        this.setPropertyBodyStyle('color', '#FFFFFF');
        this.setPropertyBodyStyle('backgroundColor', '#000000');
        this.setPropertyBodyStyle('mainColor', '#000000');
      }
      break;
      case AccessibilityButtonEnum.BlackYellow: {
        this.setPropertyBodyStyle('color', '#000000');
        this.setPropertyBodyStyle('backgroundColor', '#FFFF00');
        this.setPropertyBodyStyle('mainColor', '#FFFF00');
      }
      break;
      case AccessibilityButtonEnum.YellowBlack: {
        this.setPropertyBodyStyle('color', '#FFFF00');
        this.setPropertyBodyStyle('backgroundColor', '#000000');
        this.setPropertyBodyStyle('mainColor', '#000000');
      }
    }
  }


  private getAccessibilitySettings(): void {
    for (const accessibilitySetting in this._accessibilitySettings) {

      const valueFromLocalStorage = this._localStorageService.getValue(accessibilitySetting);

      if (valueFromLocalStorage) {
        this.setPropertyBodyStyle(accessibilitySetting, valueFromLocalStorage)
      } else {
        this._localStorageService.setValue(accessibilitySetting, this._accessibilitySettings[accessibilitySetting])
      }

    }
  }

  private setLocalStorage(name: string, value: string): void {
    this._localStorageService.setValue(name, value);
  }

  private setPropertyBodyStyle(propertyName: string, value: string,  cb?: (...arg: string[]) => void): void {
    document.body.style.setProperty(`--${ propertyName }`, value)
    this._accessibilitySettings[propertyName] = value;

    if (cb) {
      cb.bind(this, propertyName, value);
    }
  }

  private getSelectedContrast(): void {
    let index: number
    if (this._accessibilitySettings.color === '#000000' && this._accessibilitySettings.mainColor === '#FFFFFF') {
      index = this.accessibilityButtonConfig.findIndex(item => item.name === AccessibilityButtonEnum.BlackWhite)
    } else if (this._accessibilitySettings.color === '#FFFFFF' && this._accessibilitySettings.mainColor === '#000000') {
      index = this.accessibilityButtonConfig.findIndex(item => item.name === AccessibilityButtonEnum.WhiteBlack)
    } else if (this._accessibilitySettings.color === '#FFFF00' && this._accessibilitySettings.mainColor === '#000000') {
      index = this.accessibilityButtonConfig.findIndex(item => item.name === AccessibilityButtonEnum.BlackYellow)
    } else if (this._accessibilitySettings.color === '#000000' && this._accessibilitySettings.mainColor === '#FFFF00') {
      index = this.accessibilityButtonConfig.findIndex(item => item.name === AccessibilityButtonEnum.YellowBlack)
    } else {
    }

    if (index) {
      this.accessibilityButtonConfig[index].selected = true;
    }
  }
}
