import { User } from "@lib/entity/User";
import bcrypt from "bcrypt";

import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
} from "typeorm";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  /**
   * Indicates that this subscriber only listens to the User entity events.
   */
  listenTo() {
    return User;
  }

  /**
   * Called before a User entity is inserted into the database.
   */
  beforeInsert(event: InsertEvent<User>): void {
    console.log("BEFORE USER INSERTED: ", event.entity);
    // Example: Hash the user's password before saving
    if (event.entity.password) {
      event.entity.password = this.hashPassword(event.entity.password);
    }
  }

  /**
   * Called after a User entity is inserted into the database.
   */
  afterInsert(event: InsertEvent<User>): void {
    console.log("AFTER USER INSERTED: ", event.entity);
  }

  /**
   * Called before a User entity is updated.
   */
  beforeUpdate(event: UpdateEvent<User>): void {
    console.log("BEFORE USER UPDATED: ", event.entity);
    // Example: Re-hash the password if it was changed
    if (event.entity?.password && event.entity.password !== event.databaseEntity.password) {
      event.entity.password = this.hashPassword(event.entity.password);
    }
  }

  /**
   * Called after a User entity is updated.
   */
  afterUpdate(event: UpdateEvent<User>): void {
    console.log("AFTER USER UPDATED: ", event.entity);
  }

  /**
   * Called before a User entity is removed.
   */
  beforeRemove(event: RemoveEvent<User>): void {
    console.log("BEFORE USER REMOVED: ", event.entity);
  }

  /**
   * Called after a User entity is removed.
   */
  afterRemove(event: RemoveEvent<User>): void {
    console.log("AFTER USER REMOVED: ", event.entity);
  }

  /**
   * Example helper method to hash passwords.
   */
  private hashPassword(password: string): string {
    // Replace this with your actual hashing logic (e.g., bcrypt)
    return bcrypt.hashSync(password, 10);
  }
}
