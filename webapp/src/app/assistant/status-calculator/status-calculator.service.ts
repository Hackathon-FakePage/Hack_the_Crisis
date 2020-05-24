import { Injectable } from '@angular/core';
import { ReliableInfo } from '../../data-storage/data-storage.service';
import { faCheckCircle, faQuestionCircle, faTimesCircle, IconDefinition, } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root',
})
export class StatusCalculatorService {
  // formality statuses
  private mostlyFormal: GenericStatus = new GenericStatus(
    'Mostly formal',
    faCheckCircle
  );
  private moderateFormal: GenericStatus = new GenericStatus(
    'Moderately formal',
    faCheckCircle
  );
  private lowFormal: GenericStatus = new GenericStatus(
    'Moderately informal',
    faQuestionCircle
  );
  private veryLowFormal: GenericStatus = new GenericStatus(
    'Mostly informal',
    faTimesCircle
  );
  // reliability statuses
  private lowReliable: GenericStatus = new GenericStatus(
    'Not reliable source',
    faTimesCircle
  );
  private moderateReliable: GenericStatus = new GenericStatus(
    'Moderately reliable source',
    faQuestionCircle
  );
  private highReliable: GenericStatus = new GenericStatus(
    'Highly reliable source',
    faCheckCircle
  );

  calculateFormalStatus(
    data: FormalityData | undefined
  ): GenericStatus | undefined {
    if (data !== undefined) {
      const formalFraction = data.formalPercentage;
      if (formalFraction < 25) {
        return this.mostlyFormal;
      } else if (formalFraction < 50) {
        return this.moderateFormal;
      } else if (formalFraction < 75) {
        return this.lowFormal;
      }
      return this.veryLowFormal;
    }
    return undefined;
  }

  calculateReliabilityStatus(
    reliableInfo: ReliableInfo | undefined
  ): GenericStatus | undefined {
    if (reliableInfo !== undefined) {
      const reliableData = new ReliableData(reliableInfo);

      if (reliableData.reliableSum < 3) {
        return this.lowReliable;
      } else if (
        reliableData.reliableSum >= 3 &&
        reliableData.reliableSum <= 4
      ) {
        return this.moderateReliable;
      }
      return this.highReliable;
    }
    return undefined;
  }

  calculateOverallStatus(formalityData: FormalityData, reliableData?: ReliableData): OverallStatus {
    if (reliableData) {
      return new OverallStatus(formalityData, reliableData);
    }
      return new OverallStatus(formalityData);
  }
}

export class OverallStatus {
  ratingPercentage: number;

  constructor(formalityData: FormalityData, reliableData?: ReliableData) {
    this.ratingPercentage = ((reliableData ? reliableData.reliablePercentage : 0)
      + (100 - formalityData.formalPercentage)) / (reliableData ? 2 : 1);
  }
}

export class GenericStatus {
  message: string;
  faIcon: IconDefinition;

  constructor(message: string, faIcon: IconDefinition) {
    this.message = message;
    this.faIcon = faIcon;
  }
}

export class FormalityData {
  formalPercentage: number;
  informalCount: number;
  overallCount: number;

  constructor(formalScore: number, informalCount: number, overallCount: number) {
    this.formalPercentage = formalScore;
    this.overallCount = overallCount;
    this.informalCount = informalCount;
  }
}

export class ReliableData {
  reliablePercentage: number;
  reliableSum = 0;
  maxScore = 6;

  constructor(reliableInfo: ReliableInfo) {
    this.reliableSum =
      parseInt(reliableInfo.isEmotional, 10) +
      parseInt(reliableInfo.isExpert, 10) +
      parseInt(reliableInfo.isReviewed, 10);
    this.reliablePercentage = (this.reliableSum / this.maxScore) * 100;
  }
}
